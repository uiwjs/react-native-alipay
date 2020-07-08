react-native-uiwjs-alipay
===

基于 React Native 的宝支付插件。适用于商家在 App 应用中集成支付宝支付功能，商家 APP 调用支付宝提供的 SDK，SDK 再调用支付宝 APP 内的支付模块。如果用户已安装支付宝APP，商家APP会跳转到支付宝中完成支付，支付完后跳回到商家 APP 内，最后展示支付结果。如果用户没有安装支付宝 APP，商家 APP 内会调起支付宝网页支付收银台，用户登录支付宝账户，支付完后展示支付结果。完整实例 [Example](./example)

1. Android：支持2.3及以上的系统版本运行
2. iOS：iOS 6.0以上(包含iOS 6.0)
3. 支持手机系统：iOS（苹果）、Android（安卓）
4. 调试请注意 支付宝接入应用必须 `已审核通过`

## Getting started

```bash
yarn add react-native-uiwjs-alipay
# react-native version >= 0.60+
$ cd ios && pod install
# or
$ react-native link react-native-uiwjs-alipay
```

## Usage

> ⚠️ 注意支付成功返回结果是一个字符串，[返回内容](https://github.com/uiwjs/react-native-uiwjs-alipay/blob/96c86045a92b7668b51658c3e696d3cd0e5f2f9e/index.d.ts#L2-L82)  
> 支付宝需要设置 `Scheme`

```javascript
import Alipay from 'react-native-uiwjs-alipay';

// 设置 支付宝 URL Schemes
// scheme = `ap` + `APPID`
Alipay.setAlipayScheme(scheme);
// 设置支付宝沙箱环境，仅 Android 支持
Alipay.setAlipaySandbox(isSandbox);
// 支付宝端支付
// payInfo 是后台拼接好的支付参数
Alipay.alipay(payInfo, (res)=>console.log(res))
```

订单详情 [`payInfo`](https://opendocs.alipay.com/open/204/105295#%E5%BF%AB%E6%8D%B7%E8%AE%A2%E5%8D%95%E6%94%AF%E4%BB%98%20iOS) 编码前的数据

```bash
alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=xxxxxxxxxxxxxxxx&biz_content={ "out_trade_no":"1111144444", "total_amount":"0.01", "subject":"12321313655555555", "product_code":"QUICK_MSECURITY_PAY" }&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http://ane.boshu.ltd/owner/pay/api/ownerPay/callback&return_url=http://domain.com/CallBack/return_url.jsp&sign=FP5fLb/l2LoijO7k0BrmEvWKfuG7oIbYA/4VVL9mI0/SWAEzt27Zp09LK2xsDKaW0oGJ38aGhtDxGIHqZDMvbhTooB6jeRH+2m1wM5hyDq1vbc8CzfL+OSfRoQ3RQ4j50gbO0oABOUvaSb/xK8Tzix7HfDpMfjtqhN+81fiET2Q19dxcOmu22GAWE4/ZPrbASsVfi1r/OXLdeDjkqdUTy9lOGJqg2bgTKy6BaYcelc/nEpuaF0mDXbHJX1vmra7vd8rhczy11rEVaHofMnPVZr3hucMuBH/fxOXQZuZcAmyaWr+NT8hVetxZaTgyhK9fqxjGcxPijc+pWWTwMxt4YA==&sign_type=RSA2&timestamp=2020-07-08 17:07:36&version=1.0
```

订单详情 `payInfo` 编码的数据

> ⚠️ 后台 SDK 根据所有数据生成 `sign`，建议通过 API 拿到这个数据，拼接数据会报错。  
> ⚠️ `out_trade_no` 订单 id 和 `sign` 签名 是唯一的，每次不一样，需要后台生成。  

```bash
alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=xxxxxxxxxxxxxxxx&biz_content=%7B+%22out_trade_no%22%3A%221111144444%22%2C+%22total_amount%22%3A%220.01%22%2C+%22subject%22%3A%2212321313655555555%22%2C+%22product_code%22%3A%22QUICK_MSECURITY_PAY%22+%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&return_url=http%3A%2F%2Fdomain.com%2FCallBack%2Freturn_url.jsp&sign=FP5fLb%2Fl2LoijO7k0BrmEvWKfuG7oIbYA%2F4VVL9mI0%2FSWAEzt27Zp09LK2xsDKaW0oGJ38aGhtDxGIHqZDMvbhTooB6jeRH%2B2m1wM5hyDq1vbc8CzfL%2BOSfRoQ3RQ4j50gbO0oABOUvaSb%2FxK8Tzix7HfDpMfjtqhN%2B81fiET2Q19dxcOmu22GAWE4%2FZPrbASsVfi1r%2FOXLdeDjkqdUTy9lOGJqg2bgTKy6BaYcelc%2FnEpuaF0mDXbHJX1vmra7vd8rhczy11rEVaHofMnPVZr3hucMuBH%2FfxOXQZuZcAmyaWr%2BNT8hVetxZaTgyhK9fqxjGcxPijc%2BpWWTwMxt4YA%3D%3D&sign_type=RSA2&timestamp=2020-07-08+17%3A07%3A36&version=1.0
```

### 支付宝返回应用 iOS 设置

1. 在代码中设置支付宝 `URL Schemes`，下面实例为 `ap2021001172656340` 为定义的 `scheme`

```js
// scheme = `ap` + `APPID`
Alipay.setAlipayScheme('ap2021001172656340');
```

2. 在请求支付的 `payInfo` 中必须包含 `return_url=ap2021001172656340`，`return_url` 的值为定义的 `scheme`，才会返回[支付宝订单支付状态结果](https://opendocs.alipay.com/open/204/105301#%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%A4%BA%E4%BE%8B%EF%BC%88iOS%7CAndroid%EF%BC%89)

3. 用的 `URL Schemes` 列为白名单，在 [`ios/<应用名称>/Info.plist`](https://github.com/uiwjs/react-native-uiwjs-alipay/blob/866888a3ed9f05d06fa9a7ed93922d9ca2dcc56e/example/ios/example/Info.plist#L23-L41) 中添加

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>alipay</string>
</array>
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string></string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>ap2021001172656340</string>
    </array>
  </dict>
</array>
```

4. 修改 `ios/<应用名称>/AppDelegate.m` 添加下列代码：

```objective-c
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

命令测试 `xcrun simctl openurl booted ap2021001172656340://`

### 错误处理

```bash
[NetworkInfo] Signal strength query returned error: Error Domain=NSPOSIXErrorDomain Code=13 "Permission denied", descriptor: <CTServiceDescriptor 0x283317100, domain=1, instance=1>
```

在 `Product` -> `Scheme` -> `Edit Scheme` -> `Run` -> `Environment Variables` 添加 `OS_ACTIVITY_MODE` `disable`

### 其它

当前工程基于 [@brodybits/create-react-native-module](https://github.com/brodybits/create-react-native-module) 初始化。

```bash
npx create-react-native-module --package-identifier com.uiwjs --generate-example Alipay --example-react-native-version 0.62.2 --module-name react-native-uiwjs-alipay --github-account uiwjs --author-name "Kenny Wong" --author-email "wowohoo@qq.com"
```

### 相关连接 

- [支付宝生成秘钥指南](https://opendocs.alipay.com/open/291/105971)
- [支付宝 SDK 下载地址](https://opendocs.alipay.com/open/54/104509)
- [React-native 0.6版本集成支付宝-Alipay爬坑](https://segmentfault.com/a/1190000020758279)
