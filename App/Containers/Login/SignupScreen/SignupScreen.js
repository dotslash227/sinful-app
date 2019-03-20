import React, {Component} from 'react'
import {Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Button, Container, Grid, Col} from 'native-base';

class MomoObject extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Col>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Image source={{uri:"https://www.wearegurgaon.com/wp-content/uploads/2017/09/Tandoori-Momos-Nazims-Gurgaon.jpg"}} style={styles.momoPic} />
                </TouchableOpacity>                     
            </Col>
        )
    }
}


export default class SignupScreen extends Component {        

    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            email: '',
            momoCount: 0,
            selectedMomos : [],
            flag: false
        };                
    }    

    
    checkFlagStatus(){
        if (this.state.email != '' && this.state.fullName != ''){
            this.setState({flag:true});
        }
    }

    momoCounter(name){        
        let currentState = this.state;

        if (currentState.selectedMomos.includes(name)){
            currentState.selectedMomos.pop(name);
            currentState.momoCount -= 1;
        }
        else{
            if(currentState.momoCount >=3){
                alert("Only upto 3 momos can be selected, choose a biryani instead using our BiryaniNow App");
            }
            else{
                currentState.selectedMomos.push(name);
                currentState.momoCount += 1;
            }
        }

        this.setState(currentState);           
    }

    renderMomoList(){

        let momoList = [
            {
                name: "Steamed Chicken Momos",
                id: "steamed-chicken",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Tandoori Chicken Momos",
                id: "fried-chicken",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Tandoori Chicken Momos",
                id: "tandoori-chicken",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Tandoori Chicken Momos",
                id: "steamed-veg",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Tandoori Chicken Momos",
                id: "fried-veg",
                imageUrl: "https://www.delhinerds.com/logo.png"
            }

        ];
                
        return momoList.map((item, key)=>{
                return(                    
                    <MomoObject onPress={()=>this.momoCounter(item.id)} />                
                )
            }        
        )
    }

    render(){
        return(
            <ScrollView>
                <Container style={styles.Screen}>
                    <View style={{marginBottom:30}}>
                        <Text style={{color:"teal", fontWeight: "bold", textAlign: "justify"}}>
                            Hi, we just your need name and email to get you started and some preferences and then we'll
                            take you to a fascinating world of momos
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Please enter your full name"
                            placeholderTextColor="teal" 
                            style={styles.nameTextInput}
                            onChangeText = {(text)=>{this.setState({fullName:text})}}
                            onEndEditing = {()=>this.checkFlagStatus()}
                        />
                        <TextInput
                            placeholder="Please enter your email address"
                            placeholderTextColor="#B71C1C" 
                            style={styles.emailTextInput}
                            onChangeText = {(emailtext)=>{this.setState({email:emailtext})}}
                            onEndEditing = {()=>this.checkFlagStatus()}
                        />                    
                    </View>

                    <View>
                        <Text style={{color: "#B71C1C", marginTop: 25, textAlign: "justify"}}>
                            Choose upto 3 types of Momos you like to eat, often. We'll get you great deals on them!
                        </Text>
                    </View>

                    <Grid>
                        {this.renderMomoList()}
                    </Grid>                                                                 

                    <Button style={styles.nextButton} disabled={!this.state.flag} block>
                        <Text style={{color:"white", fontWeight: "bold"}}>Next</Text>
                    </Button>

                </Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Screen:{
        marginTop: "15%",
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 10
    },
    nameTextInput:{
        fontSize: 15,
        borderBottomWidth: 2,
        paddingBottom: 5,
        borderBottomColor: "teal",
        color: "teal",
        marginBottom: 20
    },
    emailTextInput:{
        fontSize: 15,
        borderBottomWidth: 2,
        paddingBottom: 5,
        borderBottomColor: "#B71C1C",
        color: "#B71C1C",
        marginBottom: 20
    },
    nextButton: {
        
    },
    momoPic: {
        width: 100,
        height: 100,
        marginRight: 15                
    },
    momoPicSelected: {
        width: 100,
        height: 100,
        marginRight: 15,
        borderWidth: 2,
        borderColor: "red",
        padding: 10
    }
})