import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Linking, AppState } from 'react-native';
import Alipay from 'react-native-uiwjs-alipay';

export default class App extends Component {
  componentDidMount() {
    Alipay.setAlipayScheme('ap2021001172656340');
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
    const payInfo = `alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021001172656340&biz_content=%7B+%22out_trade_no%22%3A%22123123213123217%22%2C+%22total_amount%22%3A%220.01%22%2C+%22subject%22%3A%221234%22%2C+%22product_code%22%3A%22QUICK_MSECURITY_PAY%22+%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&return_url=ap2021001172656340%3A%2F%2F&sign=NVSGkwXj%2BA2FATt%2BHXrzt%2B6WdalIt8JhBpTIXQRRvtkdzP0ZC85si2jK27rM5DWzrWfF9KOuA1Mk0%2BkT3P6NRKEYL4%2FDS5VlZf6BSta8CTcZIgGAnQr8H8dKCWxkzQtvUbLBCimQpJyesidmxh3tXNZNHZHcjonJeqmu%2FdSv%2BubruAfo3etNUwGJQscPGbLtCy%2BU%2BEihSmNPVTIjh56MJunF%2Fu1I%2Fbte85XCzfJVrgGnWtvpT%2BRcbdDrDkRDc3JuRHbNsRgY%2FY413ovI5xSnGZ1oWLAd%2ByXuqoT0zDL8O%2FDu38nSJU%2Bkm1SF0u6Gpkvajef4%2F6WglfCMrqZCet%2B7GA%3D%3D&sign_type=RSA2&timestamp=2020-07-08+21%3A45%3A27&version=1.0`;
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
