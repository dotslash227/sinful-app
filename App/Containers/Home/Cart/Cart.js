import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import HeaderComponent from 'App/Components/Header';

class CartScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
				<HeaderComponent title="Cart" />
				<Content />
			</Container>
		);
	}
}

export default CartScreen;
