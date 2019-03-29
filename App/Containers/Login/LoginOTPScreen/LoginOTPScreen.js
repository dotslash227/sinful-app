import React, {Component} from 'react'
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Image } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Button, Container, Content, Item, Input} from 'native-base';

export default class LoginOTPScreen extends Component {

  constructor(props){
    super(props);
    this.mobile = this.props.navigation.getParam("mobile", "NA")
    this.state = {
      isFocused : false,
      otp : '',
      flag: false
    }
  }

  goToSignup(){
    NavigationService.navigate("Signup")
  }

  otpInputHandler(text){
    this.setState({flag:false, otp:text});    
    if (text.length == 4){
      this.setState({flag:true});
    }
  }

  render() {

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
        
        <Button danger bordered style={styles.button} disabled={!this.state.flag} onPress={()=>this.goToSignup()}>
          <Text style={styles.buttonText}>Submit OTP and Continue</Text>
        </Button>        
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
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
