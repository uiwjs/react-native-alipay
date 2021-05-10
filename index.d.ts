/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * 支付宝端支付
 * 支付宝回调结果, 详情见 https://docs.open.alipay.com/204/105301
 */
export interface OrderResultStr {
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

/**
 * 支付订单返回结果
 * @returns 成功返回
 * 
 * ```json
 * {
 *   result: '{"alipay_trade_app_pay_response":{"code":"10000","msg":"Success","app_id":"2021001172656340","auth_app_id":"2021001172656340","charset":"UTF-8","timestamp":"2020-07-08 21:30:14","out_trade_no":"123123213123214","total_amount":"0.01","trade_no":"2020070822001414841426413774","seller_id":"2088421915791034"},"sign":"LY7wCsNLp+QnDqCq6VelY/RvyK7ZGY8wsXoKvS+Or7JjONLDUx5P6lDgqRKkpkng7br3y6GZzfGKaZ88Tf4eMnBMKyqU+huR2Um47xUxP383njvHlxuQZsSTLQZRswy4wmb/fPkFfvyH6Or6+oj0eboePOTu63bNr+h03w0QnP4znuHpfRuoVgWpsYh/6B1DL+4xfWRKJ21zm1SV9Feo9RWqnyTaGZyFVi6IKge0dUCYs9hXju95fOUVUOx5YflOFtSEnZafY9Ls4FCRQE1ANkjaKiKIE0+c4c4sEVEf/9Dwh88N+aSQOoLT+AV4RpjMoA8hF2k+vv2OKNeqr6SYGQ==","sign_type":"RSA2"}',
 *   resultStatus: '9000',
 *   memo: ''
 * }
 * ```
 * 
 * @returns 错误返回
 * 
 * ```json
 * {
 *   memo: "Error Domain=系统繁忙，请稍后再试 Code=1000 \"(null)\"",
 *   result: "",
 *   resultStatus: "4000",
 * }
 * ```
 */
export interface OrderResult {
  /**
   * 支付返回结果：
   * 支付宝支付返回结果，[支付宝文档地址](https://opendocs.alipay.com/open/204/105301#%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%A4%BA%E4%BE%8B%EF%BC%88iOS%7CAndroid%EF%BC%89)  
   * 支付返回结果字符串通过 `JSON.parse` 进行转换为对象 {@link OrderResultStr}
   * @typeParam OrderResultStr
   * @example
   * 
   * ```json
   * '{"alipay_trade_app_pay_response":{"code":"10000","msg":"Success","app_id":"2021001172656340","auth_app_id":"2021001172656340","charset":"UTF-8","timestamp":"2020-07-08 21:30:14","out_trade_no":"123123213123214","total_amount":"0.01","trade_no":"2020070822001414841426413774","seller_id":"2088421915791034"},"sign":"LY7wCsNLp+QnDqCq6VelY/RvyK7ZGY8wsXoKvS+Or7JjONLDUx5P6lDgqRKkpkng7br3y6GZzfGKaZ88Tf4eMnBMKyqU+huR2Um47xUxP383njvHlxuQZsSTLQZRswy4wmb/fPkFfvyH6Or6+oj0eboePOTu63bNr+h03w0QnP4znuHpfRuoVgWpsYh/6B1DL+4xfWRKJ21zm1SV9Feo9RWqnyTaGZyFVi6IKge0dUCYs9hXju95fOUVUOx5YflOFtSEnZafY9Ls4FCRQE1ANkjaKiKIE0+c4c4sEVEf/9Dwh88N+aSQOoLT+AV4RpjMoA8hF2k+vv2OKNeqr6SYGQ==","sign_type":"RSA2"}'
   * ```
   * 
   */
  result?: string;
  /**
   * 错误状态码
   * - 9000	订单支付成功  
   * - 8000	正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态  
   * - 4000	订单支付失败  
   * - 5000	重复请求  
   * - 6001	用户中途取消  
   * - 6002	网络连接出错  
   * - 6004	支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态  
   * - 其它	其它支付错误
   */
  resultStatus?: '9000' | '8000' | '4000' | '5000' | '6001' | '6002' | '6004' | string;
  /**
   * 优惠券备注信息
   * "Error Domain=系统繁忙，请稍后再试 Code=1000 "(null)""
   */
  memo: string;
}
/**
 * 快速登录授权，[支付宝文档](https://opendocs.alipay.com/open/218/105327#%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E8%AF%B4%E6%98%8E)
 * 
 */
export interface AuthResult {
  /**
   * 长度：144，本次操作返回的结果数据。
   * - `result_code` 具体状态码值请参见“result_code状态代码”。仅当resultStatus为“9000”且result_code为“200”时，代表授权成功。
   * - `auth_code` 表示授权成功的授码。
   * @example `success=true&auth_code=9c11732de44f4f1790b63978b6fbOX53&result_code=200&alipay_open_id=20881001757376426161095132517425&user_id=2088003646494707`
   */
  result:	string; 
  /**
   * 长度：5，本次操作的状态返回值，标识本次调用的结果，参见“resultStatus状态代码”。
   * - 9000	请求处理成功
   * - 4000	系统异常
   * - 6001	用户中途取消
   * - 6002	网络连接出错
   */
  resultStatus:	'9000' | '4000' | '6001' | '6002'; 
  /**
   * 长度：无，保留参数，一般无内容。	处理成功
   */
  memo:	string; 
}
/**
 * 支付
 * @param payInfo 支付详情，是后台拼接好的支付参数
 * @returns result 支付宝回调结果 https://docs.open.alipay.com/204/105301
 */
export function alipay(payInfo: string): Promise<OrderResult>;
/**
 * 快速登录授权
 * - ⚠️ 注意授权成功返回结果是一个字符串，[返回内容](https://github.com/uiwjs/react-native-alipay/blob/74140a294e850884ed1851b9d2c2d2c00ee75003/index.d.ts#L89-L113)
 * - ⚠️ 支付宝需要设置 Scheme 和 iOS添加原生代码，才能支持验证[回弹商家APP]的功能
 * - ⚠️ 支付宝 `管理中心-支付宝开放平台` 需要签约 `APP支付宝登录`
 * @param authInfoStr 验证详情
 * @returns result 支付宝回调结果 https://opendocs.alipay.com/open/218/105327
 */
export function authInfo(authInfoStr: string): Promise<AuthResult>;
/**
 *  获取当前 SDK 版本号
 *  @return 当前 SDK 版本字符串
 */
export function getVersion(): Promise<string>;
/**
 * 设置支付宝跳转Scheme，仅 iOS
 * @param scheme scheme = `ap` + `APPID`
 * @platform ios
 */
export function setAlipayScheme(scheme: string): void;
/**
 * 设置支付宝沙箱环境，仅 Android
 * @param isSandBox
 * @platform android
 */
export function setAlipaySandbox(isSandbox: boolean): void;