import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigationService from 'App/Services/NavigationService';
import { View } from 'react-native';
import styles from './RootScreenStyle';

import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import { connect } from 'react-redux';
import StartupActions from 'App/Stores/Startup/Actions';

// Login Screens:
import LoginScreen from 'App/Containers/Login/LoginScreen/LoginScreen';
import LoginOTPScreen from 'App/Containers/Login/LoginOTPScreen/LoginOTPScreen';
import SignupScreen from 'App/Containers/Login/SignupScreen/SignupScreen';
import AddressChooser from 'App/Containers/Login/AddressChooser/AddressChooser';
// Home & Main Screens:
import HomeScreen from 'App/Containers/Home/HomeScreen';

// Theme:
import { StyleProvider } from 'native-base';
import getTheme from './../../../native-base-theme/components';

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */

const App = createAppContainer(
  createStackNavigator(
    {
      // Create the application routes here (the key is the route name, the value is the target screen)
      // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
      SplashScreen: SplashScreen, // Allows time to check if user is logged in or not
      LoginScreen: LoginScreen,
      LoginOTPScreen: LoginOTPScreen,
      Signup: SignupScreen,
      AddressChooser: AddressChooser,
      Home: HomeScreen,
    },
    {
      // By default the application will show the splash screen
      initialRouteName: 'SplashScreen',
      // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
      headerMode: 'none',
    }
  )
);

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.startup();
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <App
            // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </View>
      </StyleProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen);
