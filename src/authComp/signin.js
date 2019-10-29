import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FbLogin from './fblogin';
import GoogleLogin from './google-login'
import { login } from '../store/action/action';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    onClickListener = () => {
        const { email, password } = this.state
        let user = {
            email,
            password
        }
        console.log(email, password, 'signin')
        this.props.loginFunc(user)
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView>
                    <View style={styles.viewStyle}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="email" size={28} style={styles.inputIcon} />
                            <TextInput style={styles.inputs}
                                placeholder="Email"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({ email })} />
                        </View>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="lock" size={30} style={styles.inputIcon} />
                            <TextInput style={styles.inputs}
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(password) => this.setState({ password })} />
                        </View>

                        <TouchableOpacity style={styles.restoreButtonContainer}>
                            <Text>Forgot?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.onClickListener}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text onPress={() => this.props.navigation.navigate("SignUp")}>Create an account?</Text>
                        </TouchableOpacity>

                        <View>
                            <FbLogin />
                            <GoogleLogin />
                        </View>
                        {
                            this.props.isLogin ? <ActivityIndicator style={styles.row1} size={100} color="green" /> : null
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

let mapDispatchToProps = dispatch => {
    return {
        loginFunc: data => {
            dispatch(login(data));
        }
    };
};

let mapStateToProps = state => {
    return {
        isLogin: state.authReducer.isLogin
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    icon: {
        width: 30,
        height: 30,
        color: 'white'
    },
    inputIcon: {
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
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
});