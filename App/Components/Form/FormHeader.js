import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { material } from 'react-native-typography';

export default class FormHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { title, subtitle } = this.props;
		return (
			<View style={{ paddingLeft: 20 }}>
				<Text style={material.display2}>{title}</Text>
				<Text style={material.subheading}>{subtitle}</Text>
			</View>
		);
	}
}
