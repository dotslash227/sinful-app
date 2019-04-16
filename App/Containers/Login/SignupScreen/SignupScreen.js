import React, {Component} from 'react'
import {Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Button, Container, Grid, Col, Row, Content} from 'native-base';

class MomoObject extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(            
            <TouchableOpacity onPress={this.props.onPress}>
                <Image source={{uri:"https://www.wearegurgaon.com/wp-content/uploads/2017/09/Tandoori-Momos-Nazims-Gurgaon.jpg"}} style={this.props.style} />
                <Text style={styles.momoName}>{this.props.name}</Text>
            </TouchableOpacity>                                 
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
                name: "Steamed Chicken",
                id: "steamed-chicken",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Fried Chicken",
                id: "fried-chicken",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Tandoori Chicken",
                id: "tandoori-chicken",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Steamed Veg",
                id: "steamed-veg",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Fried Veg",
                id: "fried-veg",
                imageUrl: "https://www.delhinerds.com/logo.png"
            },
            {
                name: "Tandoori Veg",
                id: "tandoori-veg",
                imageUrl: "https://www.delhinerds.com/logo.png"
            }
        ]

        let counter = 1;
        let displayUnit = null

        return(
            <FlatList
                numColumns = {3}
                data = {momoList}
                extraData = {this.state}
                renderItem = {({item, key})=>                    
                    <MomoObject id={item.id} name={item.name} onPress={
                        ()=>this.momoCounter(item.id)
                    } style={(this.state.selectedMomos.includes(item.id))?styles.momoPicSelected:styles.momoPic} />
                }
            />
        );                        
    }

    goToAddressChooser(){
        NavigationService.navigate("AddressChooser", {
            fullName: this.state.fullName,
            email: this.state.email
        })
    }

    render(){
        return(
            
                <Container style={styles.Screen}>
                <Content>
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
                            autoComplete = "off"
                            spellCheck = {false}                            
                        />
                        <TextInput
                            placeholder="Please enter your email address"
                            placeholderTextColor="#B71C1C" 
                            style={styles.emailTextInput}
                            onChangeText = {(emailtext)=>{this.setState({email:emailtext})}}
                            onEndEditing = {()=>this.checkFlagStatus()}
                            autoComplete = "off"
                            spellCheck = {false}
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

                    <Button style={styles.nextButton} disabled={!this.state.flag} block onPress={()=>this.goToAddressChooser()}>
                        <Text style={{color:"white", fontWeight: "bold"}}>Next</Text>
                    </Button>
                </Content>                    

                </Container>
            
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
    momoPic: {
        width: 105,
        height: 105,
        marginRight: 15,
        marginTop: 12
    },
    momoPicSelected: {
        width: 105,
        height: 105,
        marginRight: 15,
        borderWidth: 2,
        borderColor: "red",
        padding: 10,
        marginTop: 12
    },
    momoName:{
        fontSize: 11,
        textAlign: "justify",
        color: "teal"
    }
})