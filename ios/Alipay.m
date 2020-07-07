#import "Alipay.h"
#import <AlipaySDK/AlipaySDK.h>

@implementation Alipay
{
    NSString *alipayScheme;
    RCTResponseSenderBlock alipayCallBack;
}

RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:@"RCTOpenURLNotification" object:nil];
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
        // 支付跳转支付宝钱包进行支付，处理支付结果
        [[AlipaySDK defaultService] processOrderWithPaymentResult:aURL standbyCallback:^(NSDictionary *resultDic) {
            if (self->alipayCallBack != nil) {
                self->alipayCallBack([[NSArray alloc] initWithObjects:resultDic, nil]);
                self->alipayCallBack = nil;
            }
            NSLog(@"result = %@",resultDic);
        }];

        // 授权跳转支付宝钱包进行支付，处理支付结果
        [[AlipaySDK defaultService] processAuth_V2Result:aURL standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result = %@",resultDic);
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
                if (self->alipayCallBack != nil) {
                    self->alipayCallBack([[NSArray alloc] initWithObjects:resultArr, nil]);
                    self->alipayCallBack = nil;
                }
            }
            NSLog(@"授权结果 authCode = %@", authCode?:@"");
        }];
    }
    return NO;
}

RCT_EXPORT_METHOD(setAlipayScheme:(NSString *)scheme){
    alipayScheme = scheme;
}
RCT_EXPORT_METHOD(alipay:(NSString *)info callback:(RCTResponseSenderBlock)callback)
{
    alipayCallBack = callback;
    dispatch_async(dispatch_get_main_queue(), ^{
        [[AlipaySDK defaultService] payOrder:info fromScheme:alipayScheme callback:^(NSDictionary *resultDic) {
            NSLog(@"alipay:callback");
            
            callback([[NSArray alloc] initWithObjects:resultDic, nil]);
        }];
    });
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
