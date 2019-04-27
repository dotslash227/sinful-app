import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

// Screens:
import RestaurantsScreens from './Restaurants';
import CartScreens from './Cart';
import SettingsScreens from './Settings';

// Stacks:
const defaultSettings = {
  defaultNavigationOptions: () => ({ header: null }),
};
const RestaurantsStack = createStackNavigator(RestaurantsScreens, defaultSettings);
const CartStack = createStackNavigator(CartScreens, defaultSettings);
const SettingsStack = createStackNavigator(SettingsScreens, defaultSettings);

const TabNavigator = createBottomTabNavigator(
  {
    Restaurants: RestaurantsStack,
    Cart: CartStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Restaurants',
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Restaurants') {
          iconName = `home`;
        } else if (routeName === 'Cart') {
          iconName = `layers`;
        } else if (routeName === 'Settings') {
          iconName = `user`;
        }
        return <Icon name={iconName} size={22} style={{ color: tintColor }} />;
      },
      header: null,
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  }
);

export default createAppContainer(TabNavigator);
