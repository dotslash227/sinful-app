import React, {Component} from 'react'
import { Text, View, StyleSheet, Image} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Container, Button, Item, Input, Content} from 'native-base'

export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      mobile : '',
      flag: false      
    }
  }

  goToOTPScreen() {
    NavigationService.navigate('LoginOTPScreen', {
      mobile: this.state.mobile
    })
  }

  inputHandler(text){
    this.setState({flag:false, mobile:text});    
    if (text.length == 10){
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
              placeholder={"Please enter your phone number"}
              placeholderTextColor="teal"
              style = {styles.input}
              onChangeText = {(text)=>this.inputHandler(text)}
            />
          </Item>
          
          <Button rounded danger style={styles.button} disabled={!this.state.flag} onPress={() => this.goToOTPScreen()}>
            <Text style={styles.buttonText}>Generate OTP and Signup</Text>
          </Button>
        </Content>        
      </Container>                
    )
  }
}

const styles = StyleSheet.create({
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