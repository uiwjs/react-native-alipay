import { NativeModules, Platform } from 'react-native';

export default class Alipay {
  /**
   * 支付
   * @param orderInfo 支付详情
   * @returns result 支付宝回调结果 https://docs.open.alipay.com/204/105301
   */
  static alipay(orderInfo) {
    return NativeModules.Alipay.alipay(orderInfo);
  }

  /**
   * 快速登录授权
   * @param authInfoStr 验证详情
   * @returns result 支付宝回调结果 详情见 https://opendocs.alipay.com/open/218/105325
   */
  static authInfo(authInfoStr) {
    return NativeModules.Alipay.authInfo(authInfoStr)
  }

  /**
   *  获取当前版本号
   *  @return 当前版本字符串
   */
  static getVersion() {
    return NativeModules.Alipay.getVersion()
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
