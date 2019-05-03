import React from 'react';
import { Platform, Text, View, Button, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon } from 'native-base';

// Components
import HeaderComponent from 'App/Components/Header';
import RestaurantCard from 'App/Components/Restaurants/RestaurantCard';

class RestaurantsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.navigation.navigate('MenuScreen'); // TEST
	}

	goToMenu(restaurantId) {
		this.props.navigation.navigate('MenuScreen', {
			restaurantId,
		});
	}

	render() {
		console.log({ props: this.props });
		const { items } = this.props.restaurants;
		const list = items.map((r) => {
			return (
				<TouchableHighlight
					key={r.id}
					onPress={() => this.goToMenu(r.id)}
					activeOpacity={1}
					underlayColor="#ddd"
				>
					<RestaurantCard restaurant={r} />
				</TouchableHighlight>
			);
		});
		return (
			<Container>
				<HeaderComponent title="Home" />
				<Content padder>
					<View>{list}</View>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	const { user, restaurants } = state;
	return { user, restaurants };
};

export default connect(mapStateToProps)(RestaurantsScreen);
