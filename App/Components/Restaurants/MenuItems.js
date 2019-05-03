import React from 'react';
import { Image, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, CardItem, Body, Text, Grid, Row, Col, Icon } from 'native-base';

import { FlatGrid } from 'react-native-super-grid';
import menuItems from 'App/Data/fake-menu-items.json';

export default class MenuItems extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		//const { menuItems } = this.props;
		return (
			<FlatGrid
				itemDimension={130}
				items={menuItems}
				style={styles.gridView}
				// staticDimension={300}
				// fixed
				// spacing={20}
				renderItem={({ item, index }) => (
					<ImageBackground source={{ uri: item.itemPicture }} style={[styles.itemContainer]}>
						<Text style={styles.itemName}>{item.itemName}</Text>
						<Text style={styles.itemCode}>
							{'\u20B9'} {item.itemPrice}
						</Text>
					</ImageBackground>
				)}
			/>
		);
	}
}

const styles = StyleSheet.create({
	gridView: {
		marginTop: 20,
		flex: 1,
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 5,
		padding: 10,
		height: 150,
	},
	itemName: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '600',
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff',
	},
});
