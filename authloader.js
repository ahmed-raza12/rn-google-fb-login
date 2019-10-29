import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';


class AuthLoading extends Component {
    constructor(props){
        super(props);
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                firebase.database().ref('users/' + user.uid + '/').once('value', (snap) => {
                      var check = snap.val();
                      if(check.registeredAs === "organizer") {
                        return this.props.navigation.navigate('OrganizerStack');
                      } if(check.registeredAs === "attendee") {
                        return this.props.navigation.navigate('AttendeeStack');
                      
                    }
            })
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
    };
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator style={styles.row1} size={100} color="green" />
                <View><Text>Loading . . . . . </Text></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,


        height: 200,

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default AuthLoading;