import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

// Components:
import HeaderComponent from 'App/Components/Header';
import FooterComponent from 'App/Components/Footer';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <HeaderComponent title="Home" />
        <Content />
      </Container>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Restaurants: HomeScreen,
    Cart: HomeScreen,
    Settings: HomeScreen,
  },
  {
    initialRouteName: 'Restaurants',
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
        // You can return any component that you like here!
        console.log({ tintColor });
        return <Icon name={iconName} size={22} style={{ color: tintColor }} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  }
);

export default createAppContainer(TabNavigator);
