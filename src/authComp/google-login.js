import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

export default class GoogleLogin extends Component {
  componentDidMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true })
    GoogleSignin.configure({})

  }
  loginWithGoogle = () => {
    GoogleSignin.signIn().then(accessTokenData => {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        accessTokenData
      )
      firebase.auth().signInWithCredential(credential)
        .then(function (user) {
          alert(JSON.stringify(user))
          console.log("Sign In Success", user);
        })
        .catch(err => {
          alert(JSON.stringify(err))

          console.log("WRONG SIGNIN----------", err);
        });
    })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.loginWithGoogle} style={[styles.buttonContainer, styles.googleButton]}>
          <View style={styles.socialButtonContent}>
            <FontAwesome name="google" size={30} style={styles.icon} />
            <Text style={styles.loginText}>Sign in with google</Text>
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
  googleButton: {
    backgroundColor: "#ff0000",
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