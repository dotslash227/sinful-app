import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';
import NavigationService from 'App/Services/NavigationService';
import { Button, Container, Content, Item, Input, Form, Label } from 'native-base';
import SpinnerView from 'App/Components/Spinner';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { showMessage, hideMessage } from 'react-native-flash-message';

// redux:
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from 'App/Stores/User/Actions';

// Lib
import { validateOTP } from 'App/Lib/Auth/phone';
import { getUserProfile, updateProfileDetails } from 'App/Lib/Users';

class LoginOTPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      otp: '',
      flag: false,
      invalidOTP: false,
      loading: false,
      mobile: null,
      confirmResult: null,
    };
  }

  componentDidMount() {
    const mobile = this.props.navigation.getParam('mobile');
    const confirmResult = this.props.navigation.getParam('confirmResult');
    this.setState({ mobile, confirmResult });
  }

  async verifyOTP() {
    this.setState({ loading: true });
    const { otp, confirmResult } = this.state;
    try {
      const user = await validateOTP(confirmResult, otp);
      const { uid } = user;
      const userProfile = await getUserProfile();
      this.props.loginUser({ isLoggedIn: true, userId: String(uid), profile: userProfile });
      console.log({ userProfile });
      if (!userProfile.name || !userProfile.email) NavigationService.navigate('Signup');
      else if (!userProfile.addresses || !userProfile.addresses.length)
        NavigationService.navigate('AddressChooser');
      else NavigationService.navigate('Home');
    } catch (e) {
      console.log(e);
      showMessage({
        message: 'Invalid OTP',
        type: 'danger',
      });
      this.setState({ loading: false, invalidOTP: true });
    }
  }

  otpInputHandler(text) {
    this.setState({ flag: false, otp: text });
    if (text.length > 4) {
      this.setState({ flag: true });
    }
  }

  renderErrors() {
    if (this.state.invalidOTP) {
      alert('Invalid OTP');
    }
  }

  render() {
    if (this.state.loading) {
      return <SpinnerView />;
    } else {
      return (
        <Container style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Form style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
              <Text>Please Enter The One Time Password you received as an SMS</Text>
              <Item floatingLabel>
                <Label>OTP</Label>
                <Input
                  onChangeText={(text) => this.otpInputHandler(text)}
                  keyboardType="number-pad"
                />
              </Item>
            </Form>
          </View>
          <Button full disabled={!this.state.flag} onPress={() => this.verifyOTP()}>
            <Text style={{ color: '#fff' }}>Verify OTP</Text>
          </Button>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  errorBox: {
    padding: 15,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  buttonText: {
    textAlign: 'center',
    marginLeft: 70,
    color: 'teal',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  otpInput: {
    color: 'teal',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    marginBottom: 5,
  },
  center: {
    textAlign: 'center',
    color: 'white',
  },
  msgBox: {
    backgroundColor: 'teal',
    padding: 15,
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginTop: '20%',
    width: 300,
    height: 300,
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginUser,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOTPScreen);
