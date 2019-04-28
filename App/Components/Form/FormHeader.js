import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { H1, H3 } from 'native-base';

export default class FormHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { title, subtitle } = this.props;
		return (
			<View style={{ paddingLeft: 20 }}>
				<H1 style={{ color: '#999', fontSize: 24, marginBottom: 5 }}>{title}</H1>
				<H3 style={{ color: '#333', fontSize: 16 }}>{subtitle}</H3>
			</View>
		);
	}
}
