import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Content, Text, Button, Form, Label, Input, Item} from 'native-base';
import HeaderComponent from 'App/Components/Header'
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export class LocationBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}        
    }

    render(){
        return(
            <View>
                {this.props.locations.map((item,key)=>{
                   return(
                    <TouchableOpacity onPress={() => this.props.onPress(item)} key={key}>
                        <View style={styles.locationBar}>
                        <Text style={styles.locationText}>{item.primaryText}</Text>
                        <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                        </View>
                    </TouchableOpacity>
                   );
                })}
            </View>
        );
    }

}



export default class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            houseNumber: '',
            locality: '',
            showLocations: false,
            locations: [],
            pickedLocation: '',
            pickedLocationText: '',
            latlng: '',
            heights: {
                firstRowHeight: 300,
                secondRowHeight: 300,
            },
            nickName: '',
            allowAdd: true
        }
    }    

    getLocations(text){
        console.log(text);
        this.setState({locality:text});
        RNGooglePlaces.getAutocompletePredictions(text, {
            country: 'IN',
            types: ['establishment', 'geocode'],
            radius: 5
        }).then((results)=>{
            this.setState({locations:results, showLocations:true});
            console.log(results);
        }).catch((error)=>{
            console.log(error);
        })
    }

    locationPickerHandler(location){
        if (this.state.houseNumber != ''){
            this.setState({allowAdd: false});
            console.log(this.state.allowAdd);
        }
        
        RNGooglePlaces.lookUpPlaceByID(location.placeID)
        .then((results) => {
            this.setState({
            pickedLocation: {
                latitude: results.location.latitude,
                longitude: results.location.longitude,
            },
            latlng: { latitude: results.location.latitude, longitude: results.location.longitude },
            locality: results.address,
            showLocations: false,
            });
        })
        .catch((error) => console.log(error.message));        

    }

    render(){
        const { heights } = this.state;

        return(
            <Container>
                <HeaderComponent title="Add Address" leftComponent={true} where="AddressPage" />
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>House Number</Label>
                            <Input autoCorrect={false} spellCheck={false} onChangeText={(text)=>this.setState({houseNumber:text})} />
                        </Item>
                        <Item fixedLabel>
                            <Label>Locality</Label>
                            <Input autoCorrect={false} spellCheck={false} onChangeText={(text)=>this.getLocations(text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>Nick Name</Label>
                            <Input autoCorrect={false} spellCheck={false} onChangeText={(text)=>this.setState({nickName:text})} />
                        </Item>
                    </Form>
                    <View style={this.state.showLocations ? [styles.locationsBox] : [styles.hideBox]}>
                        <LocationBar
                            locations={this.state.locations}
                            onPress = {(location)=>this.locationPickerHandler(location)}
                        />
                    </View>

                    <Button disabled={this.state.allowAdd} full style={styles.addButton}>
                        <Text style={{color:"white"}}>Add Address</Text>
                    </Button>

                </Content>
            </Container>
        );        
    }
}

const styles = StyleSheet.create({
    addButton:{
        marginTop: 20,
        backgroundColor: "teal"
    },
    map: {
      flex: 1,
      height: 200,
    },
    secondaryText: {
      fontSize: 10,
    },
    hideBox: {
      display: 'none',
    },
    locationText: {
      color: '#C70039',
    },
    locationBar: {
      padding: 8,
      borderWidth: 1,
      borderColor: '#CFCFCF',
    },
    locationsBox: {
      display: 'flex',
      //width: '100%',
      zIndex: 100000,
      backgroundColor: '#FFFFFF',
      padding: 0,
    },
    nextButton: {
      marginTop: 20,
    },
    containerText: {
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginTop: '25%',
    },
    container: {
      zIndex: -1,
      marginTop: 20,
      height: 200,
      width: 350,
      backgroundColor: 'grey',
      position: 'relative',
    },
    SearchBar: {},
    HeaderText: {
      color: 'red',
      fontSize: 18,
      fontWeight: 'bold',
    },
    Screen: {
      backgroundColor: 'white',
    },
  });