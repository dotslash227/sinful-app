import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { material } from 'react-native-typography';
import { Icon, Button, List, ListItem, Thumbnail, Left, Body, Right } from 'native-base';

class CartTotal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { total, deliveryFee, restaurantCharges, menuPrice } = this.props.calculatedBill;
		const bill = [
			{
				name: 'Menu',
				price: menuPrice,
			},
			{
				name: 'Restaurant Charges',
				price: restaurantCharges,
			},
			{
				name: 'Delivery Fee',
				price: deliveryFee,
			},
			{
				name: 'Total',
				price: total,
				isTotal: true,
			},
		];
		console.log(bill);
		return (
			<List style={{ paddingTop: 10, paddingBottom: 10 }}>
				{bill.map(({ name, price, isTotal }) => {
					const textStyle = isTotal ? material.body2 : material.body1;
					return (
						<ListItem icon>
							<Body>
								<Text style={textStyle}>{name}</Text>
							</Body>
							<Right>
								<Text style={textStyle}>
									{'\u20B9'} {price}
								</Text>
							</Right>
						</ListItem>
					);
				})}
			</List>
		);
	}
}

export default CartTotal;
