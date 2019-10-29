import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { signup } from '../store/action/action';

class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      registeredAs: ''
    }
  }
  componentDidMount(){
    console.log(this.props.isLogin, 'did')
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.isLogin, 'next')
  }
  onClickListener = () => {
    const { fullName, email, password, registeredAs } = this.state
    if(registeredAs === '' || fullName === ''){
      alert('all fields are required')
    } else {
      let user = {
        fullName,
        email,
        password,
        registeredAs
      }
      console.log(fullName, email, password, 'signup')
      this.props.signupFunc(user)
    }
    
  }
  clickme = () => {
    Alert.alert(this.state.registeredAs)
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <View style={styles.viewStyle}>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={28} style={styles.inputIcon} />
              <TextInput style={styles.inputs}
                placeholder="Full name"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(fullName) => this.setState({ fullName })} />
            </View>
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

            <View style={styles.pickerStyle}>
              <Text style={styles.welcome}>
                How would you like to be registered as?
              </Text>
              <Picker
                style={{ height: 30, width: 250, color: 'black', marginBottom: 15, marginTop: 15 }}
                selectedValue={this.state.registeredAs}
                onValueChange={(itemValue, itemIndex) => this.setState({ registeredAs: itemValue })}
              >
                <Picker.Item label="Select an option" value="" />
                <Picker.Item label="Organizer" value="organizer" />
                <Picker.Item label="Attendee" value="attendee" />
              </Picker>

            </View>
            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.onClickListener}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableHighlight>
            {
              this.props.isLogin ? <ActivityIndicator  size={100} color="green" /> : null
            }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    signupFunc: data => {
      dispatch(signup(data));
    }
  };
};

let mapStateToProps = state => {
  console.log(state.authReducer, 'state')
  return {
    isLogin: state.authReducer.isLogin
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpView);;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  viewStyle: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    color: 'gray',
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
  signupButton: {
    backgroundColor: "gray",
  },
  signUpText: {
    color: 'white',
  },
  pickerStyle: {
    borderColor: 'black'
  }
});