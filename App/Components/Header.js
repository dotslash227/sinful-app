import React from 'react'
import { Header, Icon, Left, Right, Body, Title, Subtitle } from 'native-base'

export default class HeaderComponent extends React.Component {
	render() {
		const { title, subtitle } = this.props
		const subtitleComponent = subtitle ? <Subtitle>{subtitle}</Subtitle> : null
		return (
			<Header>
				<Left />
				<Body>
					<Title>{title}</Title>
					{subtitleComponent}
				</Body>
				<Right />
			</Header>
		)
	}
}
