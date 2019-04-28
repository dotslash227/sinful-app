import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, H1, H3 } from 'native-base';

// Components
import HeaderComponent from 'App/Components/Header';

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { user } = this.props;
		const { profile } = user;

		return (
			<Container>
				<HeaderComponent title="Settings" />
				<Content>
					<H1>{profile.name}</H1>
					<H3>{profile.email}</H3>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

export default connect(mapStateToProps)(SettingsScreen);
