import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon } from 'native-base';
import NavigationService from 'App/Services/NavigationService';

// Components
import HeaderComponent from 'App/Components/Header';
import EmptyCart from 'App/Components/Cart/EmptyCart';

class CartScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.goToHomeScreen = this.goToHomeScreen.bind(this);
	}

	goToHomeScreen(screenName = null) {
		NavigationService.navigateAndReset('Home');
		if (screenName) this.props.navigation.navigate(screenName);
	}

	render() {
		const { cart } = this.props;
		console.log({ cart });
		let mainContent;
		if (!cart.items || !cart.items.length || !cart.restaurantId)
			mainContent = <EmptyCart goToHomeScreen={this.goToHomeScreen} />;
		return (
			<Container>
				<HeaderComponent title="Cart" />
				{mainContent}
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	const { user, cart } = state;
	return { user, cart };
};

/*const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginUser,
    },
    dispatch
  );*/

export default connect(
	mapStateToProps
	//mapDispatchToProps
)(CartScreen);
