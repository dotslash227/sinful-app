import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import {Container, Grid, Row, Col, Icon, Form, Input, Item, Label, Button} from 'native-base'
import RNGooglePlaces from 'react-native-google-places';

export class LocationBar extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.location = this.props.location
    }

    render(){        
        return(  
            <View>
                {
                    this.props.locations.map((item,key)=>{
                        return(
                            <TouchableOpacity onPress={()=>this.props.onPress(item)} key={key}>
                                <View style={styles.locationBar}>
                                    <Text style={styles.locationText}>{item.primaryText}</Text>
                                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                </View>
                            </TouchableOpacity>                            
                        )
                    })
                }             
            </View>                          
        )
    }
}

export default class AddressChooser extends Component{

    constructor(props){
        super(props);
        this.state = {
            name : this.props.navigation.getParam("fullName", "none"),
            email : this.props.navigation.getParam("email", "none"),
            houseNumber : '',
            locality : '',
            userLat: null,
            userLong: null,
            locations : [],
            showLocations: false,
            pickedLocation: '',
            loading: true
        };        
    }

    componentDidMount(){
        RNGooglePlaces.getCurrentPlace()
        .then((result)=>{
            this.setState({
                userLat: result[0].location.latitude,
                userLong: result[0].location.longitude
            })
            this.setState({loading:false})
        })
        .catch((error)=>console.log(error.message))
    }

    locationPickerHandler(location){
        console.log(location);
        this.setState({pickedLocation:location, showLocations:false})
    }

    googlePlacesFunction(text){
        this.setState({locality:text});        

        RNGooglePlaces.getAutocompletePredictions(text, {
            country: "IN",
            types: ["establishment", "geocode"],
            latitude: this.state.userLat,
            longitude: this.state.userLong,
            radius: 10
        })
        .then((results)=>{
            this.setState({locations:results, showLocations:true});
        })
        .catch((error)=>console.log(error.message))

        if(this.state.locality='') this.setState({showLocations:false});
    }
    
    render(){

        if(this.state.loading==true){
            return(
                <Text>Loading</Text>
            )
        }
        else{
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
                                    autoCorrect = {false}
                                    spellCheck = {false}
                                 />
                            </Item>
                            <Item floatingLabel last style={styles.SearchBar}>
                                <Label>Enter Locality with City</Label>
                                <Input
                                    onChangeText = {(text)=>{this.googlePlacesFunction(text)}}
                                    autoCorrect = {false}
                                    spellCheck = {false}
                                 />
                            </Item>
                        </Form>
    
                        <View style={(this.state.showLocations)?[styles.locationsBox]:[styles.hideBox]}>
                            <LocationBar locations={this.state.locations} onPress={(location)=>{this.locationPickerHandler(location)}} />
                        </View>                
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

}

const styles = StyleSheet.create({
    secondaryText:{
        fontSize: 10
    },
    hideBox:{
        display:"none"
    },
    locationText:{        
        color: "#C70039"
    },
    locationBar:{        
        padding: 8,
        borderWidth: 1,
        borderColor: "#CFCFCF"
    },
    locationsBox:{  
        display: "flex",
        zIndex: 100000,      
        backgroundColor: "#FFFFFF",
        padding: 0,
        position: "absolute",
        top: 135,
        width: "100%"
    },
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
        zIndex: -1,
        marginTop: 20,
        height: 200,
        width: 350,
        backgroundColor: "grey",        
        position: "relative",        
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