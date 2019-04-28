import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAddresses } from 'App/Stores/User/Actions';

import NavigationService from 'App/Services/NavigationService';
import {
  Container,
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
import { Col, Row, Grid } from 'react-native-easy-grid';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Permissions from 'react-native-permissions';

// Components
import SpinnerView from 'App/Components/Spinner';
import FormHeader from 'App/Components/Form/FormHeader';

// Lib
import { getUserProfile, addAddressToProfile } from 'App/Lib/Users';

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

class AddressChooser extends Component {
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
      heights: {
        firstRowHeight: 300,
        secondRowHeight: 300,
      },
    };
  }

  async componentDidMount() {
    let { heights } = this.state;
    const firstRowHeight = 300;
    const secondRowHeight = Dimensions.get('window').height
      ? Dimensions.get('window').height - firstRowHeight
      : 300;
    heights = { firstRowHeight, secondRowHeight };
    this.setState({ heights });
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

  async saveAddress() {
    this.setState({ loading: true });
    const { locality, pickedLocation, houseNumber } = this.state;
    const { latitude, longitude } = pickedLocation;
    const address = {
      name: 'Home',
      houseNo: houseNumber,
      address: locality,
      geoLoc: {
        lat: latitude,
        lng: longitude,
      },
    };
    try {
      const { addresses } = await addAddressToProfile(address);
      this.props.updateAddresses({ addresses });
      this.setState({ loading: false });
      NavigationService.navigateAndReset('Home');
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
      alert('UnexpectedError');
    }
  }

  render() {
    const { user } = this.props;
    const { heights } = this.state;
    let isButtonDisabled = true;
    const { locality, pickedLocation, houseNumber } = this.state;
    const { latitude, longitude } = pickedLocation;
    if ((locality, houseNumber, latitude, longitude)) isButtonDisabled = false;

    if (this.state.loading == true) {
      return <SpinnerView />;
    } else {
      return (
        <Container>
          <Content>
            <View
              style={{
                height: heights.firstRowHeight,
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingRight: 10,
              }}
            >
              <Form>
                <FormHeader title="Address" subtitle="Tell us where we should deliver" />
                <Item floatingLabel>
                  <Label>Enter House Number</Label>
                  <Input
                    onChangeText={(text) => {
                      this.setState({ houseNumber: text });
                    }}
                    autoCorrect={false}
                    spellCheck={false}
                  />
                </Item>
                <Item floatingLabel>
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
              <View style={this.state.showLocations ? [styles.locationsBox] : [styles.hideBox]}>
                <LocationBar
                  locations={this.state.locations}
                  onPress={(location) => {
                    this.locationPickerHandler(location);
                  }}
                />
              </View>
            </View>
            <View style={{ height: heights.secondRowHeight }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1, bottom: 0, height: heights.secondRowHeight }}
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
                <Marker coordinate={this.state.latlng} />
              </MapView>
            </View>
          </Content>
          <Button
            full
            disabled={isButtonDisabled}
            style={styles.nextButton}
            onPress={() => this.saveAddress()}
          >
            <Text>Signup</Text>
          </Button>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
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

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateAddresses,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressChooser);
