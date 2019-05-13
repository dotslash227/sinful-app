import React from 'react';
import { StatusBar } from 'react-native';
import { Header, Icon, Left, Right, Body, Title, Subtitle, Text, View} from 'native-base';
import NavigationService from 'App/Services/NavigationService';

export default class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	goBack(){
		console.log("back button pressed");
		NavigationService.navigate("Settings")
	}

	render() {
		let where = (this.props.where) ? this.props.where : "Home"
		const { title, subtitle, leftComponent, rightComponent, back } = this.props;
		const backButton = <Text style={{color:"grey", fontSize: 20}} onPress={()=>NavigationService.navigate(where)}>Back</Text>;
		const subtitleComponent = subtitle ? <Subtitle>{subtitle}</Subtitle> : null;		
		return (
			<Header>
				<StatusBar barStyle="dark-content" />
				<Left style={{ flex: 1 }}>
					{leftComponent?backButton:subtitleComponent}
				</Left>
				<Body style={{ flex: 1, alignItems: 'center' }}>
					<Title>{title}</Title>
				</Body>
				<Right style={{ flex: 1 }}>{rightComponent}</Right>
			</Header>
		);
	}
}
