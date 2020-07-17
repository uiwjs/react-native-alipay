import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, Linking, AppState } from 'react-native';
import Alipay from '@uiw/react-native-alipay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: '',
    }
  }
  componentDidMount() {
    Alipay.setAlipayScheme('uiwjspay');
  }
  aliPay = async () => {
    try {
      // return_url=
      const payInfo = 'alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021001172656340&biz_content=%7B%22out_trade_no%22%3A%221111112222222%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221234%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&sign=oUQmGtkv8mrhJ0YwHl9%2FfxMcoLACWuSFKiMTC4Id8nc%2FZVvDQ6MLQq5hhtEN03Qn1%2BAtzTAaofE8nNixdroxOek2l5YtOAcYcXVYlJIyogN%2B22erN2NpDTWJ7tQTKgYFDJLRiG0DZJaxfADhUUF6UR9kdA8omoXKLDlP17ZPUs5Jr4aKv5HJtH5C53ui7PbmyWYg934L4UDC2F%2F9pPQlRwwDeE1SAaV3HW9Dt83kK52o8%2FlChXdotbFdAvH0d4qYGhpEYU5sepj9xiOMyL9aC4pMXW9INYLLGbvtqtlRchZTAfH5yji6nqqQm9KKMmcVrWdBDLyjFVNpejq1UjbJBw%3D%3D&sign_type=RSA2&timestamp=2020-07-09+12%3A16%3A16&version=1.0';
      const resule = await Alipay.alipay(payInfo);
      console.log('alipay:resule-->>>', resule);
    } catch (error) {
      console.log('alipay:error-->>>', error);
    }
  }
  authInfo = async () => {
    try {
      const authInfoStr = 'app_name=mc&auth_type=AUTHACCOUNT&apiname=com.alipay.account.auth&biz_type=openservice&product_id=APP_FAST_LOGIN&scope=kuaijie&pid=2088421915791034&target_id=15946456110003465&app_id=2021001172656340&sign_type=RSA2&sign=keluG28qbbLwAcSDI4VmCNOGHJoF3xgpVeqXu1nCBCYo%2FlYYGe00fTfV9L4G73Sk7%2B4IwK%2BZV8IL%2F04cVtk6SR74lKAR3rYOoUdQ09ZrZFuQoUkO0vekajhp75IDQIg6PedCyY0SjFTqrHlH%2FImscBwitxrlSc9YbN7uW0gY34K8t7v8NhDoqzKJeoIz43UxF5U1DpUA1ISBVxwO7du1t6rYltsRhReayPS3hnvmwYSKQZUEgBvJ%2BT2XdyCaz%2FdGV907lYagPp1Oxkoaj%2FvW5NjNsRnid7vH944CoFj9XtBK%2FNTk2tBPTHFxYRQTEG1PkgkBohGpAWOFGGOuapH0ag%3D%3D';
      const resule = await Alipay.authInfo(authInfoStr);
      // resule => success=true&auth_code=9c11732de44f4f1790b63978b6fbOX53&result_code=200&alipay_open_id=20881001757376426161095132517425&user_id=2088003646494707
      console.log('authInfo:resule-->>>', resule);
    } catch (error) {
      console.log('authInfo:error-->>>', error);
    }
  }
  getVersion = async () => {
    try {
      const version = await Alipay.getVersion();
      this.setState({ version });
      console.log('getVersion:', version);
    } catch (error) {
      console.log('getVersion:error-->>>', error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>☆Alipay Example☆</Text>
        <Button
          onPress={this.aliPay}
          title="支付宝支付"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.authInfo}
          title="登录验证"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.getVersion}
          title="获取 SDK 版本"
          color="#841584"
        />
        <Text>{this.state.version}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
