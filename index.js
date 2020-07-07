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
   * 设置支付宝跳转Scheme，仅 iOS
   * @param scheme
   */
  static setAlipayScheme(scheme) {
    if (Platform.OS === 'ios') {
      NativeModules.Alipay.setAlipayScheme(scheme);
    }
  }
}
