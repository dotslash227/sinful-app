import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import NavigationService from 'App/Services/NavigationService';
import { Container, Button, Item, Input, Form, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import SpinnerView from 'App/Components/Spinner';

// API:
import { initiatePhoneAuth } from 'App/Lib/Auth/phone';

export default class LoginScreen extends Component {
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

  async phoneLogin() {
    this.setState({ loading: true });
    const { mobile } = this.state;
    try {
      const confirmResult = await initiatePhoneAuth(mobile);
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
    if (text.length == 10) {
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
            <Row style={styles.topRow} />
            <Row>
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
    backgroundColor: 'rgba(226,62,87,1)',
  },
  errorBox: {
    padding: 15,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});
