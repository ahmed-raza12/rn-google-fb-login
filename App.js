/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import AuthLoading from './authloader';
import Signin from './src/authComp/signin';
import Signup from './src/authComp/signup';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const AuthStack = createStackNavigator({
  SignUp: Signup,
  SignIn: Signin
},
{
  initialRouteName: "SignIn",
  headerMode: 'none'
})

const MainNavigator = createStackNavigator(
  {
  AuthLoading: AuthLoading,
  Auth: AuthStack
},
{
  initialRouteName: "AuthLoading",
  headerMode: 'none'
}
)
export default class App extends Component{
  render() {
    return (
        <MainNavigator />
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
