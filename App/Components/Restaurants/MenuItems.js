import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Icon, Button } from 'native-base';
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
		const { restaurantId } = this.props;
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
	addItem(itemId) {}

	render() {
		const { item } = this.props;
		const { itemId, itemPicture, itemName, itemPrice } = item;
		return (
			<View>
				<Image style={styles.itemPicture} source={{ uri: itemPicture }} />
				<Text style={material.body2}>{itemName}</Text>
				<Text style={material.body1}>
					{'\u20B9'} {itemPrice}
				</Text>
				<View style={{ paddingTop: 5, paddingBottom: 10 }}>
					<Button bordered small full onPress={() => addItem(itemId)}>
						<Text>ADD</Text>
					</Button>
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

export default connect(mapStateToProps)(MenuItems);
