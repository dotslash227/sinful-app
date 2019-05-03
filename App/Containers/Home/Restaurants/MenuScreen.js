import React from 'react';
import { Platform, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, Button } from 'native-base';

// Components
import HeaderComponent from 'App/Components/Header';
import RestaurantCard from 'App/Components/Restaurants/RestaurantCard';
import MenuItems from 'App/Components/Restaurants/MenuItems';

class MenuScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	goBack() {
		this.props.navigation.goBack();
	}

	render() {
		const { navigation, restaurants } = this.props;
		const restaurantId = navigation.getParam(
			'restaurantId',
			'2a294c1e-ed94-4c5a-9cee-80641001444c'
		);
		const { items } = restaurants;
		const restaurant = items.find((e) => e.id === String(restaurantId));
		const leftComponent = (
			<Button transparent onPress={() => this.goBack()}>
				<Icon name="arrow-left" />
			</Button>
		);
		return (
			<Container>
				<HeaderComponent title="Menu" leftComponent={leftComponent} />
				<Content padder>
					<RestaurantCard restaurant={restaurant} disableArrow={true} />
					<MenuItems />
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	const { user, restaurants } = state;
	return { user, restaurants };
};

export default connect(mapStateToProps)(MenuScreen);
