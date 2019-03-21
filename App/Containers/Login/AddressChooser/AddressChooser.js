import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Container, Grid, Row, Col, Icon, Form, Input, Item, Label, Button} from 'native-base'

export default class AddressChooser extends Component{

    constructor(props){
        super(props);
        this.state = {
            name : this.props.navigation.getParam("fullName", "none"),
            email : this.props.navigation.getParam("email", "none"),
            houseNumber : '',
            locality : ''
        };        
    }

    googlePlacesFunction(text){
        this.setState({locality:text});
        console.log(text);        
    }

    render(){
        return(
            <Container style={styles.Screen}>
                <View>
                    <Text style={styles.HeaderText}>Hello {this.state.name}, we are almost done, we just need your delivery address and location</Text>
                </View>

                <View>
                    <Form>
                        <Item floatingLabel last style={styles.SearchBar}>
                            <Label>Enter House Number</Label>
                            <Input
                                onChangeText = {(text)=>{this.setState({houseNumber:text})}}
                             />
                        </Item>
                        <Item floatingLabel last style={styles.SearchBar}>
                            <Label>Enter Locality with City</Label>
                            <Input
                                onChangeText = {(text)=>{this.googlePlacesFunction(text)}}
                             />
                        </Item>
                    </Form>                    
                </View>

                <View style={styles.container}>
                    <Text style={styles.containerText}>For Google Maps</Text>
                </View>

                <Button full disabled style={styles.nextButton}>
                    <Text>Next</Text>
                </Button>

            </Container>
        )
    }

}

const styles = StyleSheet.create({
    nextButton:{
        marginTop: 20
    },
    containerText:{
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginTop: "25%"
    },
    container:{
        marginTop: 20,
        height: 200,
        width: 350,
        backgroundColor: "grey"
    },
    SearchBar: {
        borderBottomColor: "teal",
        justifyContent: "center",
        textAlign: "left",
        width: "100%",
        fontSize: 12
    },
    HeaderText:{
        color: "teal",
        fontSize: 14,
        fontWeight: "bold"
    },
    Screen:{
        marginTop: "15%",
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 10
    }    
})