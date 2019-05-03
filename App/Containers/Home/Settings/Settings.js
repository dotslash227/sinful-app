import React from 'react';
import { Platform, View, StyleSheet, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from 'App/Stores/User/Actions';

import NavigationService from 'App/Services/NavigationService';

import {
	Container,
	Content,
	Icon,
	Text,
	List,
	ListItem,
	Left,
	Body,
	Right,
	Button,
} from 'native-base';

// Components
import HeaderComponent from 'App/Components/Header';
import UserInfo from 'App/Components/Settings/UserInfo';

// Lib:
import { logoutCurrentUser } from 'App/Lib/Users';

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async logout() {
		try {
			console.log('Logging Out');
			const logout = await logoutCurrentUser();
			this.props.logoutUser();
			NavigationService.navigateAndReset('LoginScreen');
		} catch (e) {
			console.log(e);
			alert('Unexpected Error');
		}
	}

	render() {
		const { user } = this.props;
		const { profile } = user;

		return (
			<Container>
				<HeaderComponent title="Settings" />
				<UserInfo profile={profile} />
				<Content>
					<List>
						<ListItem icon>
							<Left>
								<Icon style={styles.listIcon} name="align-right" />
							</Left>
							<Body>
								<Text>Addresses</Text>
							</Body>
							<Right>
								<Icon name="arrow-right" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Icon style={styles.listIcon} name="phone-call" />
							</Left>
							<Body>
								<Text>Support</Text>
							</Body>
							<Right>
								<Icon name="arrow-right" />
							</Right>
						</ListItem>
						<ListItem icon onPress={() => this.logout()}>
							<Left>
								<Icon style={styles.listIcon} name="log-out" />
							</Left>
							<Body>
								<Text>Logout</Text>
							</Body>
							<Right>
								<Icon name="arrow-right" />
							</Right>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	listIcon: { fontSize: 20, color: '#2d4059' },
});

const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			logoutUser,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsScreen);
