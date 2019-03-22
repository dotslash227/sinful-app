import React, {Component} from 'react'
import { Text, View, StyleSheet, Image} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Container, Button, Item, Input, Content} from 'native-base'

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
              onChangeText = {(text)=>{this.setState({mobile:text})}}
            />
          </Item>
          
          <Button rounded danger style={styles.button} onPress={() => this.goToOTPScreen()}>
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