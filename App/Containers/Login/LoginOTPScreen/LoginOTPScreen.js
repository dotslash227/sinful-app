import React, {Component} from 'react'
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Image } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Button, Container, Content, Item, Input} from 'native-base';
import axios from "axios";
import SpinnerView from 'App/Components/Spinner';

export default class LoginOTPScreen extends Component {

  constructor(props){
    super(props);
    this.mobile = this.props.navigation.getParam("mobile", "NA")
    this.phoneToken = this.props.navigation.getParam("phoneToken", "NA")
    this.state = {
      isFocused : false,
      otp : '',
      flag: false,
      invalidOTP: false,
      loading: false
    }
  }

  componentDidMount(){
    console.log(this.mobile);
    console.log(this.phoneToken);
  }

  goToSignup(){
    this.setState({loading:true})
    axios.post("https://api.momosnow.app/auth/verify-token", {
      phoneToken: this.phoneToken,
      otp: this.state.otp
    })
    .then(res=>{      
      if ((res.data.success=true) && (res.data.isProfileComplete==true)){
        console.log("Completed Profile Yolo")
      }
      else if((res.data.success=true) && (res.data.isProfileComplete==false)){
        NavigationService.navigate("Signup")
        console.log("Profile is incomplete");
      }      
    })
    .catch(e=>{
      console.log(e);
      this.setState({loading:false, invalidOTP:true})
    })    
  }

  otpInputHandler(text){
    this.setState({flag:false, otp:text});    
    if (text.length == 4){
      this.setState({flag:true});
    }
  }

  renderErrors(){

    if (this.state.invalidOTP){
      return(
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>The OTP you entered is an invalid OTP.</Text>
          <Text style={styles.errorText}>Please try again</Text>
        </View>
      )
    }    
  }

  render() {

    if(this.state.loading){
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
              placeholder="Pleas enter the OTP"
              style={styles.otpInput}
              onChangeText = {(text)=> this.otpInputHandler(text)}
              />
            </Item>          
  
          <View style={styles.msgBox}>
            <TouchableHighlight onPress={ ()=> {this.props.navigation.goBack()} }>
              <View>
                <Text style={styles.center}>The mobile number you entered was {this.mobile}</Text>
                <Text style={styles.center}>Click on this box to edit number</Text>
              </View>            
            </TouchableHighlight>
          </View>

          {this.renderErrors()}
          
          <Button danger bordered style={styles.button} disabled={!this.state.flag} onPress={()=>this.goToSignup()}>
            <Text style={styles.buttonText}>Submit OTP and Continue</Text>
          </Button>        
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
  buttonText:{
    textAlign: "center",    
    marginLeft: 70,
    color: "teal"
  },
  button:{
    marginTop: 20,
    width: "100%"
  },
  otpInput:{
    color: "teal",
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    marginBottom: 5
  },
  center:{
    textAlign: "center",
    color: "white"
  },
  msgBox:{
    backgroundColor: "teal",
    padding: 15    
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
})
