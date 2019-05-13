import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Container, Content, Icon, Badge } from 'native-base';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
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
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const { cartItems } = screenProps;
        let iconName,
          badge = <View />;
        if (routeName === 'Restaurants') {
          iconName = `home`;
        } else if (routeName === 'Cart') {
          iconName = 'layers';
          return (
            <IconBadge
              MainElement={<Icon name={iconName} size={25} style={{ color: tintColor }} />}
              BadgeElement={<Text style={{ color: '#FFFFFF' }}>{cartItems}</Text>}
              IconBadgeStyle={{
                width: 15,
                height: 15,
                backgroundColor: 'red',
                position: 'absolute',
              }}
              Hidden={cartItems === 0 ? true : false}
            />
          );
        } else if (routeName === 'Settings') {
          iconName = `user`;
        }
        return <Icon name={iconName} size={25} style={{ color: tintColor }} />;
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

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'red',
    flex: 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 10,
    height: 10,
  },
});

const Navigator = createAppContainer(TabNavigator);

class BaseHomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: 0,
    };
  }

  setItemsCounter(props) {
    const { cart } = props;
    const { items } = cart;
    this.setState({ cartItems: items.length });
  }

  componentDidMount() {
    const props = this.props;
    this.setItemsCounter(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setItemsCounter(nextProps);
  }

  render() {
    const { cartItems } = this.state;
    return (
      <Navigator
        cartItems={cartItems}
        screenProps={{
          cartItems,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { cart } = state;
  return { cart };
};

export default connect(mapStateToProps)(BaseHomeScreen);
