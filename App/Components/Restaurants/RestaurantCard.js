import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Card, CardItem, Body, Text, Grid, Row, Col, Icon } from 'native-base';

export default class RestaurantCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const { restaurant } = this.props;
		const { id, name, pictureUrl, placeName, deliveryTime } = restaurant;
		return (
			<View key={id} style={styles.card}>
				<Grid>
					<Col style={styles.picture}>
						<Image source={{ uri: pictureUrl }} style={{ height: 80, width: 80 }} />
					</Col>
					<Col style={styles.restaurantInfo}>
						<Text style={{ fontSize: 20, color: '#2d4059' }}>{name}</Text>
						<Text style={{ fontSize: 11, color: '#666' }}>
							<Icon style={styles.infoIcon} name="clock" /> {deliveryTime} Minutes{' '}
							<Icon style={styles.infoIcon} name="map-pin" /> {placeName}
						</Text>
					</Col>
					<Col style={styles.rightIcon}>
						<Icon style={{ color: '#999' }} name="arrow-right" />
					</Col>
				</Grid>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		marginTop: 10,
		marginBottom: 10,
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	picture: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
	},
	restaurantInfo: {
		justifyContent: 'center',
		paddingLeft: 10,
	},
	rightIcon: { width: 40, justifyContent: 'center', alignItems: 'center', color: '#ddd' },
	infoIcon: { fontSize: 11, color: '#2d4059' },
});
