import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { Container, Content, Icon } from 'native-base';

// Components
import HeaderComponent from 'App/Components/Header';
import RestaurantCard from 'App/Components/Restaurants/RestaurantCard';

import restaurants from 'App/Data/fake-restaurants.json';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const list = restaurants.map((r) => {
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

export default HomeScreen;
