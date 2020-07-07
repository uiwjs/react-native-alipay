react-native-uiwjs-alipay
===

基于 React Native 的宝支付插件。适用于商家在App应用中集成支付宝支付功能，商家APP调用支付宝提供的SDK，SDK再调用支付宝APP内的支付模块。如果用户已安装支付宝APP，商家APP会跳转到支付宝中完成支付，支付完后跳回到商家APP内，最后展示支付结果。如果用户没有安装支付宝APP，商家APP内会调起支付宝网页支付收银台，用户登录支付宝账户，支付完后展示支付结果。  

1. Android：支持2.3及以上的系统版本运行
2. iOS：iOS 6.0以上(包含iOS 6.0)
3. 支持手机系统：iOS（苹果）、Android（安卓）

## Getting started

```bash
# react-native version >= 0.60+
$ cd ios && pod install
# or
$ react-native link react-native-uiwjs-alipay
```

## Usage

```javascript
import Alipay from 'react-native-uiwjs-alipay';

// 设置 支付宝URL Schemes
Alipay.setAlipayScheme(scheme);
// 支付宝 Android 支付
// orderInfo 是后台拼接好的支付参数
Alipay.alipayAndroid(orderInfo,(res)=>console.log(res))
// 支付宝 iOS 端的支付
Alipay.alipay(orderInfo, (res)=>console.log(res))
```

### 其它

当前工程基于 [@brodybits/create-react-native-module](https://github.com/brodybits/create-react-native-module) 初始化。

```bash
npx create-react-native-module --package-identifier com.uiwjs --generate-example Alipay --example-react-native-version 0.62.2 --module-name react-native-uiwjs-alipay --github-account uiwjs --author-name "Kenny Wong" --author-email "wowohoo@qq.com"
```

### 相关连接 

- [React-native 0.6版本集成支付宝-Alipay爬坑](https://segmentfault.com/a/1190000020758279)
- [支付宝生成秘钥指南](https://opendocs.alipay.com/open/291/105971)
- [支付宝 SDK 下载地址](https://opendocs.alipay.com/open/54/104509)