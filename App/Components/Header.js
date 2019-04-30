import React from 'react';
import { Header, Icon, Left, Right, Body, Title, Subtitle, Text } from 'native-base';

export default class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const { title, subtitle } = this.props;
		const subtitleComponent = subtitle ? <Subtitle>{subtitle}</Subtitle> : null;
		return (
			<Header>
				<Left style={{ flex: 1 }} />
				<Body style={{ flex: 1, alignItems: "center"}}>
					<Title>{title}</Title>
				</Body>
				<Right style={{ flex: 1 }} />
			</Header>
		);
	}
}
