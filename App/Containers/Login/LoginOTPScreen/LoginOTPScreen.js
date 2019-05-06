import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';
import NavigationService from 'App/Services/NavigationService';
import { Button, Container, Content, Item, Input, Form, Label, Row, Grid } from 'native-base';
import SpinnerView from 'App/Components/Spinner';

// Components
import { showMessage, hideMessage } from 'react-native-flash-message';
import FormHeader from 'App/Components/Form/FormHeader';

// redux:
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from 'App/Stores/User/Actions';

// Lib
import firebase from 'react-native-firebase';
import { validateOTP, resendOTP } from 'App/Lib/Auth/phone';
import { getUserProfile, updateProfileDetails } from 'App/Lib/Users';

// Settings:
const OTPTimeout = 15; // Seconds

class LoginOTPScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      isFocused: false,
      otp: '',
      flag: false,
      invalidOTP: false,
      loading: false,
      mobile: null,
      confirmResult: null,
      canResendOTP: false,
      resentOTP: false,
      timeLeft: OTPTimeout,
    };
  }

  async componentDidMount() {
    const mobile = this.props.navigation.getParam('mobile');
    const confirmResult = this.props.navigation.getParam('confirmResult');
    this.setState({ mobile, confirmResult });
    let { timeLeft } = this.state;
    const interval = setInterval(() => {
      timeLeft -= 1;
      this.setState({ timeLeft });
    }, 1000);
    setTimeout(() => {
      this.setState({ canResendOTP: true });
      clearInterval(interval);
    }, OTPTimeout * 1000);
    // Android Auto Verification:
    this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid } = user;
        const userProfile = await getUserProfile();
        this.props.loginUser({ isLoggedIn: true, userId: String(uid), profile: userProfile });
        console.log({ userProfile });
        if (!userProfile.name || !userProfile.email) NavigationService.navigate('Signup');
        else if (!userProfile.addresses || !userProfile.addresses.length)
          NavigationService.navigate('AddressChooser');
        else NavigationService.navigate('Home');
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  async verifyOTP() {
    this.setState({ loading: true });
    const { otp, confirmResult } = this.state;
    console.log('Verifying OTP', otp);
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
    if (text.length === 6) {
      this.setState({ flag: true });
    }
  }

  renderErrors() {
    if (this.state.invalidOTP) {
      alert('Invalid OTP');
    }
  }

  async resendOTP() {
    const { mobile } = this.state;
    const confirmResult = await resendOTP(mobile);
    this.setState({ resentOTP: true, confirmResult });
    showMessage({
      message: 'Resent OTP',
      type: 'info',
    });
  }

  render() {
    const { canResendOTP } = this.state;
    let { timeLeft } = this.state;
    if (this.state.loading) {
      return <SpinnerView />;
    } else {
      return (
        <Container style={{ flex: 1 }}>
          <Grid>
            <Row style={{ justifyContent: 'flex-start', padding: 10, alignItems: 'flex-end' }}>
              <FormHeader title="OTP" subtitle="Enter the OTP you recieved on your Phone Number" />
            </Row>
            <Row
              style={{
                justifyContent: 'flex-start',
                padding: 10,
                alignItems: 'flex-start',
              }}
            >
              <Form style={{ flex: 1, alignItems: 'center' }}>
                <Item floatingLabel>
                  <Label>
                    <Text>OTP</Text>
                  </Label>
                  <Input
                    onChangeText={(text) => this.otpInputHandler(text)}
                    keyboardType="number-pad"
                  />
                </Item>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 10,
                  }}
                >
                  {canResendOTP ? (
                    <Button
                      bordered
                      dark
                      disabled={this.state.resentOTP}
                      onPress={() => this.resendOTP()}
                    >
                      <Text style={{ paddingLeft: 5, paddingRight: 5 }}>Resend OTP</Text>
                    </Button>
                  ) : (
                    <Text style={{ fontSize: 20 }}>Resend OTP in {timeLeft} seconds</Text>
                  )}
                </View>
              </Form>
            </Row>
          </Grid>
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
