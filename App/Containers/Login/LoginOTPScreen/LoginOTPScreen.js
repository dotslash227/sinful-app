import React, {Component} from 'react'
import { Text, View, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import { Button, Screen, ImageBackground } from '@shoutem/ui'

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
    marginBottom: 4,
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
  },
  msgBox:{
    padding: 10,
    backgroundColor: "green",
    marginBottom : 10,
    justifyContent : "center",
    textAlign : "center"
  },
  center: {
    color: "white",
    textAlign: "center"
  }
})

export default class LoginOTPScreen extends Component {

  constructor(props){
    super(props);
    this.mobile = this.props.navigation.getParam("mobile", "NA")
    this.state = {
      isFocused : false,
      otp : ''
    }
  }

  goToSignup(){
    NavigationService.navigate("Signup")
  }

  render() {

    return (
      <Screen>
        <ImageBackground
          style={styles.bgImage}
          source={require("../../../Images/logo.png")}
        >
        <View style={styles.msgBox}>
          <TouchableHighlight onPress={ ()=> {this.props.navigation.goBack()} }>
            <View>
              <Text style={styles.center}>The mobile number you entered is {this.mobile}</Text>
              <Text style={styles.center}>Click on this box to edit number</Text>
            </View>            
          </TouchableHighlight>
        </View>
        <TextInput 
          placeholder={"Verify OTP"}
          style={styles.phoneNumber2} 
          placeholderTextColor="white"           
          onChangeText = { (text)=> {this.setState({otp:text})}}
        />
        <Button styleName="secondary" style={styles.button} onPress={()=>this.goToSignup()}>
          <Text>Press to continue</Text>
        </Button>        
        </ImageBackground>
      </Screen>  
    )
  }
}
