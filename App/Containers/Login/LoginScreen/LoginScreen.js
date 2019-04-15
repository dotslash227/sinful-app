import React, {Component} from 'react'
import { Text, View, StyleSheet, Image} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Container, Button, Item, Input, Content} from 'native-base'
import axios from 'axios';
import SpinnerView from 'App/Components/Spinner';

// API:
import { initiatePhoneAuth } from "App/Lib/Auth/phone";

export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      mobile : '',
      flag: false,
      token : '',
      error: false,
      loading: false
    }
  }

  async phoneLogin() {
    this.setState({loading:true});
    const { mobile } = this.state;
    try {
      const confirmResult = await initiatePhoneAuth(mobile);
      this.setState({loading:false});
      NavigationService.navigate('LoginOTPScreen', {
          mobile,
          confirmResult
      });
    } catch(e) {
      this.setState({loading:false});
      console.log(e);
      if(e === "InvalidPhoneNumber") alert("Phone Number is Invalid");
      else alert("Error Occured");
    }

  }

  inputHandler(text){
    this.setState({flag:false, mobile:`+91${text}`});
    if (text.length == 10){
      this.setState({flag:true});
    }
  }

  renderErrors(){

    if (this.state.error){
      return(
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>There was some error while processing your login</Text>
          <Text style={styles.errorText}>Please try again</Text>
        </View>
      )
    }    
  }

  render() {

    if (this.state.loading){
      return(
        <SpinnerView />
      )
    }

    else{
      return (
        <Container style={styles.screen}> 
          <Content>
            <Image 
              source={require("../../../Images/logo-2.png")}
              style={styles.logo}
            />
            <Item>
              <Input 
                placeholder={"Please enter your phone number"}
                placeholderTextColor="teal"
                style = {styles.input}
                onChangeText = {(text)=> this.inputHandler(text)}
              />
            </Item>
            
            <Button rounded danger style={styles.button} disabled={!this.state.flag} onPress={() => this.phoneLogin()}>
              <Text style={styles.buttonText}>Generate OTP and Signup</Text>
            </Button>
  
            {this.renderErrors()}
          
          </Content>        
        </Container>                
      ) 
    }
  }
}

const styles = StyleSheet.create({
  errorBox:{
    padding: 15
  },
  errorText: {
    textAlign: "center",
    color: "red"
  },
  input:{
    textAlign:"center",
    color: "teal"
  },
  buttonText:{    
    color: "white",
    textAlign: "center",
    fontSize: 15,    
    marginLeft: 40
  },
  screen:{
    flex: 1,
    flexDirection: "column",
    alignItems: "center",    
    backgroundColor: "white"
  },
  logo:{
    marginTop: "20%",        
    width: 300,
    height: 300,
  },        
  button:{        
    width: "100%",    
    marginTop: 20,
    padding: 20,        
  }
})