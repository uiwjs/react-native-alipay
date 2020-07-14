#import "RNAlipay.h"
#import <AlipaySDK/AlipaySDK.h>


@interface RNAlipay ()
@property (nonatomic, copy) RCTPromiseResolveBlock payOrderResolve;
@end


@implementation RNAlipay
{
    NSString *alipayScheme;
}

RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:@"RCTOpenURLNotification" object:nil];
        // 反注释下面代码，可以输出支付宝 SDK 调试信息，便于诊断问题
        // [AlipaySDK startLogWithBlock:^(NSString* log){
        //      NSLog(@"%@", log);
        // }];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (BOOL)handleOpenURL:(NSNotification *)aNotification
{
    NSString * aURLString =  [aNotification userInfo][@"url"];
    NSURL * aURL = [NSURL URLWithString:aURLString];
    if ([aURL.host isEqualToString:@"safepay"]) {
        __weak __typeof__(self) weakSelf = self;
        /**
         *  处理支付宝app支付后跳回商户app携带的支付结果Url
         *
         *  @param resultUrl        支付宝app返回的支付结果url
         *  @param completionBlock  支付结果回调 为nil时默认使用支付接口的completionBlock
         */
        [[AlipaySDK defaultService] processOrderWithPaymentResult:aURL standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result-->1 = %@", resultDic);
            if (weakSelf.payOrderResolve) {
                weakSelf.payOrderResolve(resultDic);
                weakSelf.payOrderResolve = nil;
            }
        }];

        /**
         *  处理支付宝app授权后跳回商户app携带的授权结果Url
         *
         *  @param aURL        支付宝app返回的授权结果url
         *  @param completionBlock  授权结果回调,用于处理跳转支付宝授权过程中商户APP被系统终止的情况
         */
        [[AlipaySDK defaultService] processAuth_V2Result:aURL standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result-->2 = %@", resultDic);
            // 解析 auth code
            NSString *result = resultDic[@"result"];
            NSString *authCode = nil;
            if (result.length>0) {
                NSArray *resultArr = [result componentsSeparatedByString:@"&"];
                for (NSString *subResult in resultArr) {
                    if (subResult.length > 10 && [subResult hasPrefix:@"auth_code="]) {
                        authCode = [subResult substringFromIndex:10];
                        break;
                    }
                }
                // 返回结果回调
                if (weakSelf.payOrderResolve) {
                    weakSelf.payOrderResolve([[NSArray alloc] initWithObjects:resultArr, nil]);
                    weakSelf.payOrderResolve = nil;
                }
            }
            NSLog(@"授权结果 authCode = %@", authCode?:@"");
        }];
    }
    return NO;
}


RCT_EXPORT_METHOD(setAlipayScheme:(NSString *)scheme) {
    alipayScheme = scheme;
}

RCT_EXPORT_METHOD(alipay:(NSString *)info resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    self.payOrderResolve = resolve;
    [AlipaySDK.defaultService payOrder:info fromScheme: alipayScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(authInfo:(NSString *)info resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [AlipaySDK.defaultService auth_V2WithInfo:info fromScheme: alipayScheme callback:^(NSDictionary *resultDic) {
        resolve(resultDic);
    }];
}

RCT_EXPORT_METHOD(getVersion: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([[AlipaySDK defaultService] currentVersion]);
}

/*! 
 * [warn][tid:main][RCTModuleData.mm:68] Module Alipay requires main queue setup since it overrides `init` but doesn't implement `requiresMainQueueSetup`. 
 * In a future release React Native will default to initializing all native modules on a background thread unless explicitly opted-out of.
 */
+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
