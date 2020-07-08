
/**
 * 支付宝端支付
 * 支付宝回调结果, 详情见 https://docs.open.alipay.com/204/105301
 */
export interface AliOrderResult {
  alipay_trade_app_pay_response: {
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
  },
  sign: string;
  sign_type: 'RSA2' | 'RSA';
}



interface Resule {
  /**
   * "Error Domain=系统繁忙，请稍后再试 Code=1000 "(null)""
   * 优惠券备注信息
   */
  memo: string;
  result?: string;
  /**
   * 9000	订单支付成功  
   * 8000	正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态  
   * 4000	订单支付失败  
   * 5000	重复请求  
   * 6001	用户中途取消  
   * 6002	网络连接出错  
   * 6004	支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态  
   * 其它	其它支付错误
   */
  resultStatus?: '9000' | '8000' | '4000' | '5000' | '6001' | '6002' | '6004' | string;
}

// 错误返回
// {
//   memo: "Error Domain=系统繁忙，请稍后再试 Code=1000 \"(null)\"",
//   result: "",
//   resultStatus: "4000",
// }
// 成功返回
// { 
//   result: '{"alipay_trade_app_pay_response":{"code":"10000","msg":"Success","app_id":"2021001172656340","auth_app_id":"2021001172656340","charset":"UTF-8","timestamp":"2020-07-08 21:30:14","out_trade_no":"123123213123214","total_amount":"0.01","trade_no":"2020070822001414841426413774","seller_id":"2088421915791034"},"sign":"LY7wCsNLp+QnDqCq6VelY/RvyK7ZGY8wsXoKvS+Or7JjONLDUx5P6lDgqRKkpkng7br3y6GZzfGKaZ88Tf4eMnBMKyqU+huR2Um47xUxP383njvHlxuQZsSTLQZRswy4wmb/fPkFfvyH6Or6+oj0eboePOTu63bNr+h03w0QnP4znuHpfRuoVgWpsYh/6B1DL+4xfWRKJ21zm1SV9Feo9RWqnyTaGZyFVi6IKge0dUCYs9hXju95fOUVUOx5YflOFtSEnZafY9Ls4FCRQE1ANkjaKiKIE0+c4c4sEVEf/9Dwh88N+aSQOoLT+AV4RpjMoA8hF2k+vv2OKNeqr6SYGQ==","sign_type":"RSA2"}',
//   resultStatus: '9000',
//   memo: ''
// }


export const Alipay: {
  /**
   * @param payInfo 支付详情
   * @param result 支付宝回调结果
   */
  alipay: (payInfo: string, callback?: (result: Resule) => void) => void;
  /**
   * 设置支付宝跳转Scheme，仅 iOS
   * @param scheme scheme = `ap` + `APPID`
   */
  setAlipayScheme: (scheme: string) => void;
  /**
   * 设置支付宝沙箱环境，仅 Android
   * @param isSandBox
   */
  setAlipaySandbox: (isSandbox: boolean) => void;
};

export default Alipay;