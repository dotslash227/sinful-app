import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { material } from 'react-native-typography';
import { Icon, Button, List, ListItem, Thumbnail, Left, Body, Right } from 'native-base';

// redux:
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setRestaurantId } from 'App/Stores/Cart/Actions';

class CartItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { cart } = this.props;
		const { items } = cart;
		return (
			<List>
				{items.map((item) => {
					return <SingleItem key={item.itemId} item={item} removeItem={this.props.removeItem} />;
				})}
			</List>
		);
	}
}

class SingleItem extends React.Component {
	render() {
		const { item, removeItem } = this.props;
		const { itemPicture, itemId, itemName, itemPrice } = item;
		return (
			<ListItem thumbnail>
				<Left>
					<Thumbnail square source={{ uri: itemPicture }} />
				</Left>
				<Body>
					<Text>{itemName}</Text>
					<Text note numberOfLines={1}>
						{itemPrice}
					</Text>
				</Body>
				<Right>
					<Button transparent onPress={() => removeItem(itemId)}>
						<Icon name="minus-square" />
					</Button>
				</Right>
			</ListItem>
		);
	}
}

const mapStateToProps = (state) => {
	const { cart } = state;
	return { cart };
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setRestaurantId,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartItems);
