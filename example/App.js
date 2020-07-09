import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Linking, AppState } from 'react-native';
import Alipay from 'react-native-uiwjs-alipay';

export default class App extends Component {
  componentDidMount() {
    Alipay.setAlipayScheme('uiwjspay');
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange)
  }
  // [info][tid:com.facebook.react.JavaScript] 'nextAppState:', 'inactive'
  // [info][tid:com.facebook.react.JavaScript] 'nextAppState:', 'background'
  // [info][tid:com.facebook.react.JavaScript] 'nextAppState:', 'active'
  // [info][tid:com.facebook.react.JavaScript] 'nextAppState:res:', null
  _handleAppStateChange = (nextAppState) => {
    console.log('nextAppState:', nextAppState)
    if(nextAppState==='active'){
      Linking.getInitialURL().then(res => {
        console.log('nextAppState:res:', res)
      })
    }
  }
  aliPay = () => {
    // return_url=
    const payInfo = `alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021001172656340&biz_content=%7B%22out_trade_no%22%3A%221111112222222%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221234%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&sign=oUQmGtkv8mrhJ0YwHl9%2FfxMcoLACWuSFKiMTC4Id8nc%2FZVvDQ6MLQq5hhtEN03Qn1%2BAtzTAaofE8nNixdroxOek2l5YtOAcYcXVYlJIyogN%2B22erN2NpDTWJ7tQTKgYFDJLRiG0DZJaxfADhUUF6UR9kdA8omoXKLDlP17ZPUs5Jr4aKv5HJtH5C53ui7PbmyWYg934L4UDC2F%2F9pPQlRwwDeE1SAaV3HW9Dt83kK52o8%2FlChXdotbFdAvH0d4qYGhpEYU5sepj9xiOMyL9aC4pMXW9INYLLGbvtqtlRchZTAfH5yji6nqqQm9KKMmcVrWdBDLyjFVNpejq1UjbJBw%3D%3D&sign_type=RSA2&timestamp=2020-07-09+12%3A16%3A16&version=1.0`;
    Alipay.alipay(payInfo, (resule) => {
      console.log('resule-->>>', resule)
    });
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
