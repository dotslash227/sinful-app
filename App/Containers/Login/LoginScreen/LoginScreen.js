import React, {Component} from 'react'
import { Text, View, StyleSheet, Image, TextInput } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import { Button, ImageBackground, Screen } from '@shoutem/ui'

const styles = StyleSheet.create({
  bgImage:{
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.8
  },
  phoneNumber:{
    width: "70%",
    opacity: 1,
    color: "white",
    height: 25,
    marginBottom: 10,
    fontSize: 15,
    borderBottomWidth: 3,
    borderBottomColor: "green",
    textAlign: "center"
  },
  phoneNumber2:{
    width: "70%",
    opacity: 1,
    color: "white",
    height: 25,
    marginBottom: 4,
    fontSize: 15,
    borderBottomWidth: 3,
    borderBottomColor: "white",
    textAlign: "center"
  },
  button:{
    padding: 10,
    backgroundColor: "white"    
  }
})

export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      mobile : ''
    }
  }

  goToOTPScreen() {
    NavigationService.navigate('LoginOTPScreen', {
      mobile: this.state.mobile
    })
  }

  render() {
    return (
      <Screen>
        <ImageBackground  
          style={styles.bgImage}
          source={require("../../../Images/bg.jpg")}
        >
        <TextInput 
          placeholder={"Enter Phone Number"}
          style={styles.phoneNumber}
          placeholderTextColor="white"
          onChangeText = {(text)=>{this.setState({mobile:text})}}
        />
        <Button styleName="secondary" style={styles.button} onPress={
          () => this.goToOTPScreen()          
        }>
          <Text>Generate OTP</Text>
        </Button>
        </ImageBackground>
      </Screen>                
    )
  }
}
