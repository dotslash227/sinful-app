import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationService from 'App/Services/NavigationService';
import {
  Container,
  Grid,
  Row,
  Col,
  Icon,
  Form,
  Input,
  Item,
  Label,
  Button,
  FooterTab,
  Footer,
  Content,
} from 'native-base';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SpinnerView from 'App/Components/Spinner';
import Permissions from 'react-native-permissions';

export class LocationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.location = this.props.location;
  }

  render() {
    return (
      <View>
        {this.props.locations.map((item, key) => {
          return (
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

export default class AddressChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.getParam('fullName', 'none'),
      email: this.props.navigation.getParam('email', 'none'),
      houseNumber: '',
      locality: '',
      userLat: null,
      userLong: null,
      locations: [],
      showLocations: false,
      pickedLocation: '',
      pickedLocationText: '',
      loading: true,
      latlng: '',
      flag: false,
    };
  }

  async componentDidMount() {
    try {
      const checkPermission = await Permissions.check('location');
      if (checkPermission !== 'authorized') {
        const request = await Permissions.request('location');
        console.log({ permission: request, checkPermission });
      }
      const result = await RNGooglePlaces.getCurrentPlace();
      this.setState({
        loading: false,
        userLat: result[0].location.latitude,
        userLong: result[0].location.longitude,
        latlng: { latitude: result[0].location.latitude, longitude: result[0].location.longitude },
      });      
    } catch (e) {
      console.log(e.message);
    }
  }

  locationPickerHandler(location) {
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

  googlePlacesFunction(text) {
    console.log(text);
    this.setState({ locality: text });
    RNGooglePlaces.getAutocompletePredictions(text, {
      country: 'IN',
      types: ['establishment', 'geocode'],
      latitude: this.state.userLat,
      longitude: this.state.userLong,
      radius: 10,
    })
      .then((results) => {        
        this.setState({ locations: results, showLocations: true });
        console.log(this.state);
      })
      .catch((error) => console.log(error.message));

    if ((this.state.locality = '')) this.setState({ showLocations: false });
  }

  render() {
    if (this.state.loading == true) {
      return <SpinnerView />;
    } else {
      return (
        <Container style={styles.Screen}>
          <View>            
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude:
                    this.state.pickedLocation == ''
                      ? this.state.userLat
                      : this.state.pickedLocation.latitude,
                  longitude:
                    this.state.pickedLocation == ''
                      ? this.state.userLong
                      : this.state.pickedLocation.longitude,
                latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                minZoomLevel={10}
                maxZoomLevel={20}
              >
                <Marker coordinate={this.state.latlng} draggable />
              </MapView>
              
            </View>    


          <Content style={{paddingLeft: 10, paddingRight: 10, marginTop: 10}}>          
            <View>
              <Text style={styles.HeaderText}>
                Hello {this.state.name}, we are almost done, we just need your delivery address and
                location
              </Text>
            </View>

            <View>
              <Form>
                <Item floatingLabel last style={styles.SearchBar}>
                  <Label>Enter House Number</Label>
                  <Input
                    onChangeText={(text) => {
                      this.setState({ houseNumber: text });
                    }}
                    autoCorrect={false}
                    spellCheck={false}
                  />
                </Item>
                <Item floatingLabel last style={styles.SearchBar}>
                  <Label>Enter Locality with City</Label>
                  <Input
                    onChangeText={(text) => {
                      this.googlePlacesFunction(text);
                    }}
                    autoCorrect={false}
                    spellCheck={false}
                    value={this.state.locality}
                  />
                </Item>
              </Form>              
            </View>

            <View style={this.state.showLocations ? [styles.locationsBox] : [styles.hideBox]}>
              <LocationBar
                locations={this.state.locations}
                onPress={(location) => {
                  this.locationPickerHandler(location);
                }}
              />
              </View>
                            
              <Footer style={{ position: 'absolute', top: 500 }}>
              <FooterTab>                
              </FooterTab>
            </Footer>            
                                         
          </Content>

          <Button full disabled style={styles.nextButton}>
            <Text>Signup</Text>
          </Button>

        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({  
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 700,
    width: 500    
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
    width: "100%",    
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
  SearchBar: {
    borderBottomColor: 'teal',
    justifyContent: 'center',
    textAlign: 'left',
    width: '100%',
    fontSize: 12,
  },
  HeaderText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Screen: {    
    backgroundColor: 'white',     
  },
});
