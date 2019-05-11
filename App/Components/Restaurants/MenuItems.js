import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

// redux:
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setRestaurantId, addItemToCart, removeItemFromCart } from 'App/Stores/Cart/Actions';

import { Text, Icon, Button, Grid, Col } from 'native-base';
import { material } from 'react-native-typography';
import { FlatGrid } from 'react-native-super-grid';

// Fake Data
import menuItems from 'App/Data/fake-menu-items.json';

class MenuItems extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const { restaurantId, cart } = this.props;
		return (
			<View style={{ padding: 10 }}>
				<FlatGrid
					items={menuItems}
					itemDimension={150}
					renderItem={({ item, index }) => <SingleItem item={item} {...this.props} />}
				/>
			</View>
		);
	}
}

class SingleItem extends React.Component {
	addItem(item) {
		const { cart, restaurantId } = this.props;
		if (!cart.restaurantId) {
			this.props.setRestaurantId(restaurantId);
			this.props.addItemToCart(item);
			console.log('Set Restaurant ID + Added Item');
		} else if (cart.restaurantId && cart.restaurantId === restaurantId) {
			this.props.addItemToCart(item);
			console.log('Added Item');
		} else if (cart.items.length && cart.restaurantId !== restaurantId) {
			// Old Items might be in Cart
			this.props.setRestaurantId(restaurantId);
			alert('Items already in the cart from different restaurant. Remove them?');
			// TODO: Set Restaurant
		} else {
			console.log('Nothing.');
		}
	}

	removeItem(itemId) {
		this.props.removeItemFromCart(itemId);
	}

	render() {
		const { item, cart, restaurantId } = this.props;
		const { itemId, itemPicture, itemName, itemPrice } = item;
		const itemCount =
			cart.restaurantId === restaurantId ? cart.items.filter((i) => i.itemId === itemId).length : 0;
		return (
			<View>
				<Image style={styles.itemPicture} source={{ uri: itemPicture }} />
				<Text style={material.body2}>{itemName}</Text>
				<Text style={material.body1}>
					{'\u20B9'} {itemPrice}
				</Text>
				<View style={{ paddingTop: 5, paddingBottom: 10 }}>
					{itemCount > 0 ? (
						<Grid>
							<Col>
								<Button bordered small onPress={() => this.removeItem(itemId)}>
									<Icon name="minus" />
								</Button>
							</Col>
							<Col>
								<Text style={{ textAlign: 'center' }}>{itemCount}</Text>
							</Col>
							<Col>
								<Button bordered small onPress={() => this.addItem(item)}>
									<Icon name="plus" />
								</Button>
							</Col>
						</Grid>
					) : (
						<Button bordered small full onPress={() => this.addItem(item)}>
							<Text>ADD</Text>
						</Button>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	itemPicture: {
		width: 150,
		height: 150,
	},
});

const mapStateToProps = (state) => {
	const { cart } = state;
	return { cart };
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setRestaurantId,
			addItemToCart,
			removeItemFromCart,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuItems);
