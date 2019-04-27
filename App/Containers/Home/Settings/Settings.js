import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import HeaderComponent from 'App/Components/Header';

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
				<HeaderComponent title="Settings" />
				<Content />
			</Container>
		);
	}
}

export default SettingsScreen;
