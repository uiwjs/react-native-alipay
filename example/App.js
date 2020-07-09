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
    const payInfo = `alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021001172656340&biz_content=%7B+%22out_trade_no%22%3A%22123123123123123%22%2C+%22total_amount%22%3A%220.01%22%2C+%22subject%22%3A%221234%22%2C+%22product_code%22%3A%22QUICK_MSECURITY_PAY%22+%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fane.boshu.ltd%2Fowner%2Fpay%2Fapi%2FownerPay%2Fcallback&return_url=uiwjspay%3A%2F%2F&sign=re%2F%2B2SICQggOUjfxl7MtP%2Fqzir2e%2BLdH4m%2B02gDcw0fkByO5MqXW%2F9bmXw%2Bc4RMqo835OAjMZs7s966ZuDx2PB%2BhO0tJ%2FbzdHLLqYlBeCcETkrfwRx%2BAFZNgzsCn75eRCA7GONH35BpfSeGkQUZ%2BvNXftqd6hWaa7m%2FMhQYrjQcV98IVJM%2BUR67Gj68c%2BLM586cnk0%2Brbj8zoos6tCvN8c3xx5UaCobzw4Ogf0PWZ7PZROTU9w2gtoxFfOC5d5slN3laaAXVjAxSf9JCNs8q95fDbzpbmstQOuPgGHkASkd%2FbeH0F8eqTVv8gW1ZTo5v%2Fd%2FE2wSDGV1DciaEnCroTw%3D%3D&sign_type=RSA2&timestamp=2020-07-09+09%3A50%3A41&version=1.0`;
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
