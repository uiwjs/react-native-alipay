import { NativeModules, Platform } from 'react-native';

export default class Alipay {

  /**
   * 支付宝端支付
   * @param orderInfo 支付详情
   * @param callback 支付宝回调结果  详情见 https://docs.open.alipay.com/204/105301
   */
  static alipay(orderInfo, callback) {
    NativeModules.Alipay.alipay(orderInfo, callback)
  }

  /**
   * 支付宝授权请求信息
   * @param infoStr 授权请求信息字串
   * @param callback 授权结果回调  详情见 https://opendocs.alipay.com/open/218/105325
   */
  static authInfo(infoStr, callback) {
    NativeModules.Alipay.authInfo(infoStr, callback)
  }

  /**
   * 设置支付宝跳转Scheme，仅 iOS
   * @param scheme
   */
  static setAlipayScheme(scheme) {
    if (Platform.OS === 'ios') {
      NativeModules.Alipay.setAlipayScheme(scheme);
    }
  }

  /**
   * 设置支付宝沙箱环境，仅 Android
   * @param isSandBox
   */
  static setAlipaySandbox(isSandBox) {
    if (Platform.OS === 'android') {
      NativeModules.Alipay.setAlipaySandbox(isSandBox);
    }
  }
}
