react-native-uiwjs-alipay
===

基于 React Native 的宝支付插件。

1. Android：支持2.3及以上的系统版本运行
2. iOS：iOS 6.0以上(包含iOS 6.0)
3. 支持手机系统：iOS（苹果）、Android（安卓）

## Getting started

```bash
yarn add react-native-uiwjs-alipay
# react-native version >= 0.60+
$ cd ios && pod install
# or
$ react-native link react-native-uiwjs-alipay
```

## Usage

```javascript
import Alipay from 'react-native-uiwjs-alipay';

// 设置 支付宝 URL Schemes
// scheme = `ap` + `APPID`
Alipay.setAlipayScheme(scheme);
// 设置支付宝沙箱环境
Alipay.setAlipaySandbox(isSandbox);
// 支付宝 iOS 端的支付
// payInfo 是后台拼接好的支付参数
Alipay.alipay(payInfo, (res)=>console.log(res))
```

订单详情 [`payInfo`](https://opendocs.alipay.com/open/204/105295#%E5%BF%AB%E6%8D%B7%E8%AE%A2%E5%8D%95%E6%94%AF%E4%BB%98%20iOS) 编码前的数据

```bash
app_id=xxxxxxxxx&biz_content={"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http://domain.merchant.com/payment_notify&sign_type=RSA2&timestamp=2016-08-25 20:26:31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj+y48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp/M45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g=
```

订单详情 `payInfo` 编码的数据

> 订单参数通过 `encodeURIComponent` 编码 和 `decodeURIComponent` 解码。

```bash
app_id=xxxxxxxxx&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D
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