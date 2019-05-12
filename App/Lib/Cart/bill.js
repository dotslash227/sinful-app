async function calculateBill({ cartItems, restaurantId, address }) {
	const menuPrice = cartItems
		.map((item) => Number(item.itemPrice))
		.reduce((a, i) => a + i)
		.toFixed(2);
	const deliveryFee = 0;
	const restaurantCharges = 0;
	const total = Number(menuPrice + deliveryFee + restaurantCharges).toFixed(2);
	return {
		menuPrice,
		deliveryFee,
		restaurantCharges,
		total,
	};
}

export { calculateBill };
