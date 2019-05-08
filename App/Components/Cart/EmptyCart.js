import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { material } from 'react-native-typography';
import { Icon, Button } from 'native-base';

export default class EmptyCart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
			>
				<Icon
					name="silverware-fork-knife"
					type="MaterialCommunityIcons"
					style={{ fontSize: 40, color: '#ea5455' }}
				/>
				<Text
					style={[
						material.subheading,
						{
							textAlign: 'center',
							paddingLeft: 50,
							paddingRight: 50,
							paddingTop: 10,
							paddingBottom: 10,
						},
					]}
				>
					Your Cart seems to be empty. Add items from the menu to order.
				</Text>
				<View>
					<Button bordered style={{ padding: 10 }} onPress={() => this.props.goToHomeScreen()}>
						<Text>View Restaurants</Text>
					</Button>
				</View>
			</View>
		);
	}
}
