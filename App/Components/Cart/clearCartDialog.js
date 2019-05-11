import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { material } from 'react-native-typography';
import { Icon, Button } from 'native-base';

// redux:
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setRestaurantId } from 'App/Stores/Cart/Actions';

import Dialog from 'react-native-dialog';

class ClearCartDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	resetCart() {
		const { restaurantId } = this.props;
		this.props.setRestaurantId(restaurantId ? restaurantId : null);
		this.props.closeDialog();
	}

	cancel() {
		this.props.closeDialog();
	}

	render() {
		let { text } = this.props;
		const { visible } = this.props;
		if (!text) text = 'Do you want to Clear the Cart and remove all the menu items in it?';
		return (
			<View>
				<Dialog.Container visible={visible}>
					<Dialog.Title>Clear Cart</Dialog.Title>
					<Dialog.Description>{text}</Dialog.Description>
					<Dialog.Button label="Cancel" onPress={() => this.cancel()} />
					<Dialog.Button label="Clear Cart" onPress={() => this.resetCart()} />
				</Dialog.Container>
			</View>
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
)(ClearCartDialog);
