import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import btnfb from '../images/fb-login.png';

export default class FbLogin extends Component {


  _fbLogin = () => {
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          // alert("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            accessTokenData => {
              console.log(accessTokenData, "accessTokenData");
              const credential = firebase.auth.FacebookAuthProvider.credential(
                accessTokenData.accessToken
              );
              console.log(credential);
              firebase
                .auth()
                .signInWithCredential(credential)
                .then((user)=> {
                  console.log("Sign In Success", user);
                }).catch((err)=>{ 
                  alert(JSON.stringify(err))
                });
            }
          )
          .catch(error => {
              console.log(error, "some error occurred");
          })
        }
      },
    );
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._fbLogin} style={[styles.buttonContainer, styles.fabookButton]}>
          <View style={styles.socialButtonContent}>
            <FontAwesome name="facebook-official" color="white" size={30} style={styles.icon} />
            <Text style={styles.loginText}>Continue with facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  icon: {
    width: 30,
    height: 30,
    color: 'white'
},
  loginButton: {
    backgroundColor: 'gray',
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  loginText: {
    color: 'white',
  },
  restoreButtonContainer: {
    width: 250,
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  socialButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: "#FFFFFF",
    marginRight: 5
  }
})