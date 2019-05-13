import React from 'react';
import { Platform, Text, View } from 'react-native';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeItemFromCart } from 'App/Stores/Cart/Actions';

import { Container, Content, Icon, Button } from 'native-base';
import NavigationService from 'App/Services/NavigationService';

// Components
import Spinner from 'App/Components/Spinner';
import HeaderComponent from 'App/Components/Header';
import EmptyCart from 'App/Components/Cart/EmptyCart';
import CartItems from 'App/Components/Cart/CartItems';
import CartTotal from 'App/Components/Cart/CartTotal';
import { showMessage } from 'react-native-flash-message';

// Lib
import { calculateBill } from 'App/Lib/Cart/bill';
import { getCurrentUser } from 'App/Lib/Users';
import RazorpayCheckout from 'react-native-razorpay';
import commonLib from 'App/Lib/common';

class CartScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			calculatedBill: {
				total: 0,
				restaurantCharges: 0,
				deliveryFee: 0,
				menuPrice: 0,
			},
		};
		this.goToHomeScreen = this.goToHomeScreen.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	goToHomeScreen(screenName = null) {
		NavigationService.navigateAndReset('Home');
		if (screenName) this.props.navigation.navigate(screenName);
	}

	removeItem(itemId) {
		console.log({ props: this.props });
		this.props.removeItemFromCart(itemId);
	}

	async componentDidMount() {
		const props = this.props;
		this.setCalculatedBill(props);
	}

	async componentWillReceiveProps(nextProps) {
		this.setCalculatedBill(nextProps);
	}

	async setCalculatedBill(props) {
		this.setState({ loading: true });
		const { cart } = props;
		if (cart && cart.items && cart.items.length) {
			const calculatedBill = await calculateBill({ cartItems: cart.items });
			this.setState({ calculatedBill });
		}
		this.setState({ loading: false });
	}

	async payButton() {
		const { calculatedBill } = this.state;
		const { user } = this.props;
		const { phoneNumber } = getCurrentUser();
		const { total } = calculatedBill;
		const razorPayAmount = total * 100;
		// Options : https://razorpay.com/docs/payment-gateway/integrations-guide/checkout/standard/
		var options = {
			description: 'MomosNow Order',
			//image: 'https://i.imgur.com/3g7nmJC.png',
			currency: 'INR',
			key: 'rzp_test_Pi8XwISSA72vyS',
			amount: razorPayAmount,
			name: 'MomosNow',
			prefill: {
				email: user.profile.email,
				contact: phoneNumber,
				name: user.profile.name,
			},
			theme: { color: '#ea5455' },
		};
		console.log({ options });
		try {
			const payment = await RazorpayCheckout.open(options);
			console.log({ payment });
		} catch (e) {
			console.log(e);
			let message = 'Something went wrong';
			if (e.code === 0) message = 'Payment was Cancelled';
			showMessage({
				message: message,
				type: 'danger',
			});
		}
	}

	render() {
		const { calculatedBill, loading } = this.state;
		const { cart } = this.props;
		if (loading) return <Spinner />;
		let mainContent,
			isCartEmpty = true;
		if (!cart.items || !cart.items.length || !cart.restaurantId) {
			isCartEmpty = true;
			mainContent = <EmptyCart goToHomeScreen={this.goToHomeScreen} />;
		} else {
			isCartEmpty = false;
			mainContent = (
				<Content padder>
					<CartItems removeItem={this.removeItem} />
					<CartTotal calculatedBill={calculatedBill} />
				</Content>
			);
		}
		return (
			<Container>
				<HeaderComponent title="Cart" />
				{mainContent}
				{isCartEmpty ? (
					<View />
				) : (
					<Button full block onPress={() => this.payButton()}>
						<Text style={{ color: 'white' }}>
							Pay {'\u20B9'} {calculatedBill.total}
						</Text>
					</Button>
				)}
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	const { user, cart } = state;
	return { user, cart };
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			removeItemFromCart,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartScreen);
