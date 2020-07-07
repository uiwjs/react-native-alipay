
/**
 * 支付宝端支付
 * 支付宝回调结果, 详情见 https://docs.open.alipay.com/204/105301
 */
export interface AliOrderResult {
  /**
   * 长度：64，商户网站唯一订单号	70501111111S001111119
   */
  out_trade_no: string;  
  /**
   * 长度：64，该交易在支付宝系统中的交易流水号。最长64位。	2014112400001000340011111118
   */
  trade_no: string;      
  /**
   * 长度：32，支付宝分配给开发者的应用Id。	2014072300007148
   */
  app_id: string;        
  /**
   * 长度：9	，该笔订单的资金总额，单位为RMB-Yuan。取值范围为[0.01,100000000.00]，精确到小数点后两位。	9.00
   */
  total_amount: number;  
  /**
   * 长度：16，收款支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字	20886894
   */
  seller_id: string;    
  /**
   * 长度：16，处理结果的描述，信息来自于code返回结果的描述	success
   */
  msg: string;          
  /**
   * 长度：16，编码格式	utf-8
   */
  charset: string;      
  /**
   * 长度：32，时间	2016-10-11 17:43:36
   */
  timestamp: string;    
  /**
   * 长度：16，结果码	具体见公共错误码
   */
  code: string;         
}


export const Alipay: {
  /**
   * @param payInfo 支付详情
   * @param result 支付宝回调结果
   */
  alipay: (payInfo: string, callback?: (result: AliOrderResult) => void) => void;
  /**
   * 设置支付宝跳转Scheme，仅 iOS
   * @param scheme scheme = `ap` + `APPID`
   */
  setAlipayScheme: (scheme: string) => void;
};

export default Alipay;