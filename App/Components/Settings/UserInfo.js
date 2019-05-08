import React from 'react';
import { Platform, Text, View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, H1, H3 } from 'native-base';

export default class UserInfo extends React.Component {
	render() {
		const { profile } = this.props;
		return (
			<View style={styles.container}>
				<H1 style={styles.profileName}>Hi, {profile.name}</H1>
				<H3 style={styles.profileEmail}>{profile.email}</H3>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingBottom: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#2d4059"
	},
	profileName: {
		color: "white",
		fontSize: 18,
	},
	profileEmail: {
		color: "white",
		fontSize: 13,
	},
});
