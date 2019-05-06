import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from 'App/Services/NavigationService';
import { Container, Button, Item, Input, Form, Label, Content, Row, Grid } from 'native-base';

// Components
import SpinnerView from 'App/Components/Spinner';
import FormHeader from 'App/Components/Form/FormHeader';

// API:
import { initiatePhoneAuth } from 'App/Lib/Auth/phone';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      flag: false,
      token: '',
      error: false,
      loading: false,
    };
  }

  componentWillMount() {
    const { user } = this.props;
    const { isLoggedIn, profile } = user;
    if (isLoggedIn && (!profile.name || !profile.email)) {
      NavigationService.navigateAndReset('Signup');
    } else if (isLoggedIn && (!profile.addresses || !profile.addresses.length)) {
      console.log('Sending to Address Chooser');
      NavigationService.navigateAndReset('AddressChooser');
    } else if (isLoggedIn) {
      NavigationService.navigateAndReset('Home');
    }
  }

  async phoneLogin() {
    this.setState({ loading: true });
    const { mobile } = this.state;
    try {
      const confirmResult = await initiatePhoneAuth(mobile);
      console.log(confirmResult);
      this.setState({ loading: false });
      NavigationService.navigate('LoginOTPScreen', {
        mobile,
        confirmResult,
      });
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
      if (e === 'InvalidPhoneNumber') alert('Phone Number is Invalid');
      else alert('Error Occured');
    }
  }

  inputHandler(text) {
    this.setState({ flag: false, mobile: `+91${text}` });
    if (text.length === 10) {
      this.setState({ flag: true });
    }
  }

  renderErrors() {
    if (this.state.error) {
      return (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>There was some error while processing your login</Text>
          <Text style={styles.errorText}>Please try again</Text>
        </View>
      );
    }
  }

  render() {
    if (this.state.loading) {
      return <SpinnerView />;
    } else {
      return (
        <Container>
          <Grid>
            <Row style={{ alignItems: 'flex-end' }}>
              <FormHeader title="Welcome" subtitle="Please enter your Phone Number" />
            </Row>
            <Row style={{ alignItems: 'flex-start' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Form>
                  <Item floatingLabel>
                    <Label>Phone Number</Label>
                    <Input
                      onChangeText={(text) => this.inputHandler(text)}
                      keyboardType="number-pad"
                    />
                  </Item>
                </Form>
              </View>
            </Row>
          </Grid>

          <Button full disabled={!this.state.flag} onPress={() => this.phoneLogin()}>
            <Text style={{ color: '#fff' }}>Continue</Text>
          </Button>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  topRow: {
    backgroundColor: '#ea5455',
  },
  errorBox: {
    padding: 15,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(LoginScreen);
