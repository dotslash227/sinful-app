import React from 'react';
import { Platform, View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, Text, List, ListItem, Left, Body, Right } from 'native-base';

// Components
import HeaderComponent from 'App/Components/Header';
import UserInfo from 'App/Components/Settings/UserInfo';

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
				<UserInfo profile={profile} />
				<Content>
					<List>
						<ListItem icon>
							<Left><Icon style={styles.listIcon} name="align-right" /></Left>
							<Body><Text>Addresses</Text></Body>
							<Right><Icon name="arrow-right" /></Right>
						</ListItem>
						<ListItem icon>
							<Left><Icon style={styles.listIcon} name="phone-call" /></Left>
							<Body><Text>Support</Text></Body>
							<Right><Icon name="arrow-right" /></Right>
						</ListItem>
						<ListItem icon>
							<Left><Icon style={styles.listIcon} name="log-out" /></Left>
							<Body><Text>Logout</Text></Body>
							<Right><Icon name="arrow-right" /></Right>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	listIcon: { fontSize: 20, color: "#2d4059" }
});

const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

export default connect(mapStateToProps)(SettingsScreen);
