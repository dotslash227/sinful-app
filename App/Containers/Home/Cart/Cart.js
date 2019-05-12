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

// Lib
import { calculateBill } from 'App/Lib/Cart/bill';

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
		const { cart } = this.props;
		if (cart && cart.items && cart.items.length) {
			const calculatedBill = await calculateBill({ cartItems: cart.items });
			this.setState({ calculatedBill });
		}
		this.setState({ loading: false });
	}

	async componentWillReceiveProps(nextProps) {
		this.setState({ loading: true });
		const { cart } = nextProps;
		if (cart && cart.items && cart.items.length) {
			const calculatedBill = await calculateBill({ cartItems: cart.items });
			this.setState({ calculatedBill });
		}
		this.setState({ loading: false });
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
					<Button full block>
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
