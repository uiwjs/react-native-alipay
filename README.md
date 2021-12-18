<p align="center">
  <a href="https://uiwjs.github.io/react-native-alipay/">
    <img src="https://user-images.githubusercontent.com/1680273/89095947-f0046900-d404-11ea-83ec-2408267efaa7.png" height="100" />
  </a>
  <h1 align="center">@uiw/react-native-alipay</h1>
<p>


[![NPM Version](https://img.shields.io/npm/v/@uiw/react-native-alipay.svg)](https://npmjs.org/package/@uiw/react-native-alipay)
![David](https://img.shields.io/david/peer/uiwjs/react-native-alipay)

基于 React Native 的宝支付插件，支持 iOS/Android。适用于商家在 App 应用中集成支付宝支付功能，商家 APP 调用支付宝提供的 SDK，SDK 再调用支付宝 APP 内的支付模块。如果用户已安装支付宝APP，商家APP会跳转到支付宝中完成支付，支付完后跳回到商家 APP 内，最后展示支付结果。如果用户没有安装支付宝 APP，商家 APP 内会调起支付宝网页支付收银台，用户登录支付宝账户，支付完后展示支付结果。完整实例 [Example](./example) | [完整的接口文档](https://uiwjs.github.io/react-native-alipay/)

![](https://gw.alipayobjects.com/zos/skylark-tools/public/files/c0aa8379f5f57c55f1e5bf25e6f426d1.png)

![](https://gw.alipayobjects.com/zos/skylark-tools/public/files/2454bffde14f428b2eeb2bfb6aa28d6b.png)

> ⚠️ `4.0+` 在 iOS 打包中报错，这是因为[使用阿里云产品的 SDK 出现 UTDID 冲突的问题](https://help.aliyun.com/document_detail/39984.html)，在 [@EatherToo](https://github.com/EatherToo) 的帮助下([#44](https://github.com/uiwjs/react-native-alipay/pull/44))，UTDID 被剥离了。可以在 `Podfile` 中加上 `pod 'UTDID'` 解决打包失败的问题。感谢 [@abing](https://github.com/ouabing)

## 注意事项

1. Android：支持2.3及以上的系统版本运行。
2. iOS：iOS 6.0以上(包含iOS 6.0)。
3. 支持手机系统：iOS（苹果）、Android（安卓）。
4. 调试请注意 支付宝接入应用必须 `已审核通过` 状态。
5. 支付宝开放平台-管理中心，签约 `APP支付` 和 `APP支付宝登录` 功能。
6. 适用于 `react-native >= 0.60+` 低版本未测试。
7. AlipaySDK 15.7.7 已更新到最新的支付宝 SDK 版本。
8. `URL Schemes` 要以字母开头不能为纯数字。

## 安装依赖

```bash
yarn add @uiw/react-native-alipay
# react-native version >= 0.60+
$ cd ios && pod install
```

## API

### `Alipay.alipay` 支付

> `Alipay.alipay: (payInfo: string) => Promise<OrderResult>;`

- ⚠️ 注意支付成功返回结果是一个字符串，[返回内容](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/index.d.ts#L50-L74)  
- ⚠️ 支付宝需要设置 `Scheme` 和 iOS添加原生代码，才能支持支付和[回弹商家APP](#支付宝返回应用-ios-设置)的功能
- ⚠️ 支付宝 `管理中心-支付宝开放平台` 需要签约 [`APP支付`](https://opendocs.alipay.com/open/200/105310#%E6%B7%BB%E5%8A%A0%E5%BA%94%E7%94%A8%E5%8A%9F%E8%83%BD)

```javascript
import Alipay from '@uiw/react-native-alipay';

// 设置 支付宝 URL Schemes，要表述他是宇宙唯一性，可以使用 `bundle Identifier`
// scheme = `alipay` + `APPID`，`APPID` 为支付宝分配给开发者的应用ID
Alipay.setAlipayScheme(scheme);
// ⚠️ 目前不可用，设置支付宝沙箱环境，仅 Android 支持
// Alipay.setAlipaySandbox(isSandbox);

async function aliPay() {
  // 支付宝端支付
  // payInfo 是后台拼接好的支付参数
  // return_url=
  const payInfo = 'alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021001172656340&biz_content=%7B%22out_trade_no%22%3A%221111112222222%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221234%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&sign=oUQmGtkv8mrhJ0YwHl9%2FfxMcoLACWuSFKiMTC4Id8nc%2FZVvDQ6MLQq5hhtEN03Qn1%2BAtzTAaofE8nNixdroxOek2l5YtOAcYcXVYlJIyogN%2B22erN2NpDTWJ7tQTKgYFDJLRiG0DZJaxfADhUUF6UR9kdA8omoXKLDlP17ZPUs5Jr4aKv5HJtH5C53ui7PbmyWYg934L4UDC2F%2F9pPQlRwwDeE1SAaV3HW9Dt83kK52o8%2FlChXdotbFdAvH0d4qYGhpEYU5sepj9xiOMyL9aC4pMXW9INYLLGbvtqtlRchZTAfH5yji6nqqQm9KKMmcVrWdBDLyjFVNpejq1UjbJBw%3D%3D&sign_type=RSA2&timestamp=2020-07-09+12%3A16%3A16&version=1.0';
  const resule = await Alipay.alipay(payInfo);
  console.log('alipay:resule-->>>', resule);
}
```

订单详情 [`payInfo`](https://opendocs.alipay.com/open/204/105295#%E5%BF%AB%E6%8D%B7%E8%AE%A2%E5%8D%95%E6%94%AF%E4%BB%98%20iOS) 编码前的数据

```bash
alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=xxxxxxxxxxxxx&biz_content={ "out_trade_no":"123123123123123", "total_amount":"0.01", "subject":"1234", "product_code":"QUICK_MSECURITY_PAY" }&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http://ane.boshu.ltd/owner/pay/api/ownerPay/callback&return_url=uiwjspay://&sign=re/+2SICQggOUjfxl7MtP/qzir2e+LdH4m+02gDcw0fkByO5MqXW/9bmXw+c4RMqo835OAjMZs7s966ZuDx2PB+hO0tJ/bzdHLLqYlBeCcETkrfwRx+AFZNgzsCn75eRCA7GONH35BpfSeGkQUZ+vNXftqd6hWaa7m/MhQYrjQcV98IVJM+UR67Gj68c+LM586cnk0+rbj8zoos6tCvN8c3xx5UaCobzw4Ogf0PWZ7PZROTU9w2gtoxFfOC5d5slN3laaAXVjAxSf9JCNs8q95fDbzpbmstQOuPgGHkASkd/beH0F8eqTVv8gW1ZTo5v/d/E2wSDGV1DciaEnCroTw==&sign_type=RSA2&timestamp=2020-07-09 09:50:41&version=1.0
```

订单详情 `payInfo` 编码的数据

```bash
alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=xxxxxxxxxxxxx&biz_content=%7B+%22out_trade_no%22%3A%22123123123123123%22%2C+%22total_amount%22%3A%220.01%22%2C+%22subject%22%3A%221234%22%2C+%22product_code%22%3A%22QUICK_MSECURITY_PAY%22+%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&return_url=uiwjspay%3A%2F%2F&sign=re%2F%2B2SICQggOUjfxl7MtP%2Fqzir2e%2BLdH4m%2B02gDcw0fkByO5MqXW%2F9bmXw%2Bc4RMqo835OAjMZs7s966ZuDx2PB%2BhO0tJ%2FbzdHLLqYlBeCcETkrfwRx%2BAFZNgzsCn75eRCA7GONH35BpfSeGkQUZ%2BvNXftqd6hWaa7m%2FMhQYrjQcV98IVJM%2BUR67Gj68c%2BLM586cnk0%2Brbj8zoos6tCvN8c3xx5UaCobzw4Ogf0PWZ7PZROTU9w2gtoxFfOC5d5slN3laaAXVjAxSf9JCNs8q95fDbzpbmstQOuPgGHkASkd%2FbeH0F8eqTVv8gW1ZTo5v%2Fd%2FE2wSDGV1DciaEnCroTw%3D%3D&sign_type=RSA2&timestamp=2020-07-09+09%3A50%3A41&version=1.0
```

- ⚠️ 后台 SDK 根据所有数据生成 `sign`，建议通过 API 拿到这个数据，拼接数据会报错。  
- ⚠️ `out_trade_no` 订单 id 和 `sign` 签名 是唯一的，每次不一样，需要后台生成。  

支付返回结果，支付宝[返回结果参数说明](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/index.d.ts#L50-L74)：

```json
{ 
  "result": "{\"alipay_trade_app_pay_response\":{\"code\":\"10000\",\"msg\":\"Success\",\"app_id\":\"2021001172656340\",\"auth_app_id\":\"2021001172656340\",\"charset\":\"UTF-8\",\"timestamp\":\"2020-07-08 21:30:14\",\"out_trade_no\":\"123123213123214\",\"total_amount\":\"0.01\",\"trade_no\":\"2020070822001414841426413774\",\"seller_id\":\"2088421915791034\"},\"sign\":\"LY7wCsNLp+QnDqCq6VelY/RvyK7ZGY8wsXoKvS+Or7JjONLDUx5P6lDgqRKkpkng7br3y6GZzfGKaZ88Tf4eMnBMKyqU+huR2Um47xUxP383njvHlxuQZsSTLQZRswy4wmb/fPkFfvyH6Or6+oj0eboePOTu63bNr+h03w0QnP4znuHpfRuoVgWpsYh/6B1DL+4xfWRKJ21zm1SV9Feo9RWqnyTaGZyFVi6IKge0dUCYs9hXju95fOUVUOx5YflOFtSEnZafY9Ls4FCRQE1ANkjaKiKIE0+c4c4sEVEf/9Dwh88N+aSQOoLT+AV4RpjMoA8hF2k+vv2OKNeqr6SYGQ==\",\"sign_type\":\"RSA2\"}",
  "resultStatus": "9000",
  "memo": ""
}
```

### `Alipay.authInfo` 登录授权

> `Alipay.authInfo: (authInfoStr: string) => Promise<AuthResult>`;

- ⚠️ 注意授权成功返回结果是一个字符串，[返回内容](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/index.d.ts#L89-L113)  
- ⚠️ 支付宝需要设置 `Scheme` 和 iOS添加原生代码，才能支持验证[回弹商家APP](#支付宝返回应用-ios-设置)的功能
- ⚠️ 支付宝 `管理中心-支付宝开放平台` 需要签约 [`APP支付宝登录`](https://opendocs.alipay.com/open/200/105310#%E6%B7%BB%E5%8A%A0%E5%BA%94%E7%94%A8%E5%8A%9F%E8%83%BD)

```javascript
import Alipay from '@uiw/react-native-alipay';

// 设置 支付宝 URL Schemes，要表述他是宇宙唯一性，可以使用 `bundle Identifier`
// scheme = `alipay` + `APPID`，`APPID` 为支付宝分配给开发者的应用ID
Alipay.setAlipayScheme(scheme);

async function authInfo() {
  // 支付宝端授权验证
  // authInfoStr 是后台拼接好的验证参数
  const authInfoStr = 'app_name=mc&auth_type=AUTHACCOUNT&apiname=com.alipay.account.auth&biz_type=openservice&product_id=APP_FAST_LOGIN&scope=kuaijie&pid=2088421915791034&target_id=15946456110003465&app_id=2021001172656340&sign_type=RSA2&sign=keluG28qbbLwAcSDI4VmCNOGHJoF3xgpVeqXu1nCBCYo%2FlYYGe00fTfV9L4G73Sk7%2B4IwK%2BZV8IL%2F04cVtk6SR74lKAR3rYOoUdQ09ZrZFuQoUkO0vekajhp75IDQIg6PedCyY0SjFTqrHlH%2FImscBwitxrlSc9YbN7uW0gY34K8t7v8NhDoqzKJeoIz43UxF5U1DpUA1ISBVxwO7du1t6rYltsRhReayPS3hnvmwYSKQZUEgBvJ%2BT2XdyCaz%2FdGV907lYagPp1Oxkoaj%2FvW5NjNsRnid7vH944CoFj9XtBK%2FNTk2tBPTHFxYRQTEG1PkgkBohGpAWOFGGOuapH0ag%3D%3D';
  const resule = await Alipay.authInfo(authInfoStr);
  // resule => success=true&auth_code=9c11732de44f4f1790b63978b6fbOX53&result_code=200&alipay_open_id=20881001757376426161095132517425&user_id=2088003646494707
  console.log('authInfo:resule-->>>', resule);
}
```

授权返回结果，支付宝[返回结果参数说明](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/index.d.ts#L89-L113)：

```json
{
  "resultStatus": "9000",
  "memo": "处理成功",
  "result": "success=true&result_code=200&app_id=202100117265&auth_code=8b6e5581b85WX84&scope=kuaijie&alipay_open_id=20881029919664670&user_id=20880025&target_id=15946456110003465"
}
```

### `Alipay.getVersion` 获取 SDK 版本

> `Alipay.getVersion: () => Promise<string>;`

```js
import Alipay from '@uiw/react-native-alipay';

async function getVersion() {
  const version = await Alipay.getVersion();
  console.log('version:', version);
}
```

## 支付宝返回应用 iOS 设置

- ⚠️ Android 端不需要做任何设置。
- ⚠️ 如果用户从 `支付宝App` 跳转到 `商家APP`，是通过系统功能切换，而不是通过 `支付宝APP` 功能键返回 `商家APP`，回调函数是不起作用的，可通过 [`AppState.addEventListener`](https://github.com/uiwjs/react-native-alipay/blob/5daea87bf0af05d60d0ae9e4c04e1e2d1a6e4273/example/App.js#L8-L24) 监听事件请求后台 API，来优化这一用户体验。

1. 在代码中设置支付宝 [`URL Schemes`](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/example/App.js#L7)，下面实例 [`uiwjspay`](https://github.com/uiwjs/react-native-alipay/commit/f6d21b6b7ec7236b195c56281f971092f3c9bb08) 是定义的 `scheme`，你也可以定义为 `alipay` + `appid`，`appid` 为支付宝分配给开发者的应用ID，用来表述 `scheme` 唯一性。

```js
Alipay.setAlipayScheme('uiwjspay');
```

2. 在请求支付的 [`payInfo`](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/example/App.js#L11) 中必须包含 [`return_url=uiwjspay://`](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/example/App.js#L11)，`return_url` 的值为定义的 `scheme` => `uiwjspay://`，才会返回[支付宝订单支付状态结果](https://opendocs.alipay.com/open/204/105301#%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%A4%BA%E4%BE%8B%EF%BC%88iOS%7CAndroid%EF%BC%89)

```js
// payInfo 是后台拼接好的支付参数，这个参数必须包含 `return_url=uiwjspay://`
Alipay.alipay(payInfo, (res)=>console.log(res))
```

3. 用的 `URL Schemes` 列为白名单，在 [`ios/<应用名称>/Info.plist`](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/example/ios/example/Info.plist#L23-L41) 中添加

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
      <string>uiwjspay</string>
    </array>
  </dict>
</array>
```

4. 修改 [`ios/<应用名称>/AppDelegate.m`](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/example/ios/example/AppDelegate.m#L60-L70) 添加下列代码：

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

**命令测试**

- iOS: `xcrun simctl openurl booted uiwjspay://`
- Android：`adb shell am start -W -a android.intent.action.VIEW -d "uiwjspay://test/router" com.uiwjspay`

## 错误处理

```bash
[NetworkInfo] Signal strength query returned error: Error Domain=NSPOSIXErrorDomain Code=13 "Permission denied", descriptor: <CTServiceDescriptor 0x283317100, domain=1, instance=1>
```

在 `Product` -> `Scheme` -> `Edit Scheme` -> `Run` -> `Arguments` -> `Environment Variables` 添加 `OS_ACTIVITY_MODE` `disable`

## 其它

当前工程基于 [@brodybits/create-react-native-module](https://github.com/brodybits/create-react-native-module) 初始化。

```bash
npx create-react-native-module --package-identifier com.uiwjs --object-class-name RNAlipay --generate-example Alipay --example-react-native-version 0.63.0 --module-name @uiw/react-native-alipay --github-account uiwjs --author-name "Kenny Wong" --author-email "wowohoo@qq.com"
```

## 开发

```bash
cd example   # 进入实例 example 工程，根目录不需要安装，会引发错误
yarn install # 安装依赖

cd ios     # 进入 example/ios 目录安装依赖
pod instll # 安装依赖
```

## 相关连接 

- [支付宝：生成秘钥指南](https://opendocs.alipay.com/open/291/105971)
- [支付宝：SDK 下载地址，当前使用的是 AlipaySDK	15.8.03](https://opendocs.alipay.com/open/54/104509)
- [支付宝：客户端调试工具及使用教程](https://openclub.alipay.com/club/history/read/7695)
- [支付宝：支付，接入前准备](https://opendocs.alipay.com/open/204/105297/)
- [支付宝：完整版授权 SDK 调用方法](https://opendocs.alipay.com/open/218/105325)
- [支付宝：异步通知错误码: IllRet](https://opensupport.alipay.com/support/problem.htm?ant_source=antsupport)
- [@uiw/react-native-wechat](https://github.com/uiwjs/react-native-wechat) 微信支付。
