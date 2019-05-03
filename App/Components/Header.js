import React from 'react';
import { StatusBar } from 'react-native';
import { Header, Icon, Left, Right, Body, Title, Subtitle, Text } from 'native-base';

export default class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const { title, subtitle, leftComponent, rightComponent } = this.props;
		const subtitleComponent = subtitle ? <Subtitle>{subtitle}</Subtitle> : null;
		return (
			<Header>
				<StatusBar barStyle="dark-content" />
				<Left style={{ flex: 1 }}>{leftComponent}</Left>
				<Body style={{ flex: 1, alignItems: 'center' }}>
					<Title>{title}</Title>
				</Body>
				<Right style={{ flex: 1 }}>{rightComponent}</Right>
			</Header>
		);
	}
}
