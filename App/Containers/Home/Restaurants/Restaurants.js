import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
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

	render() {
		const { items } = this.props.restaurants;
		const list = items.map((r) => {
			return <RestaurantCard key={r.id} restaurant={r} />;
		});
		return (
			<Container>
				<HeaderComponent title="Home" />
				<Content>
					<View style={{ padding: 10 }}>{list}</View>
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
