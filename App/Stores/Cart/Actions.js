export const setRestaurantId = (restaurantId) => ({
	type: 'CART_SET_RESTAURANT_ID',
	payload: { restaurantId },
});

export const addItemToCart = ({ itemId, itemPicture, itemName, itemPrice }) => ({
	type: 'CART_ADD_ITEM',
	payload: { item: { itemId, itemPicture, itemName, itemPrice } },
});

export const removeItemFromCart = (itemId) => ({
	type: 'CART_REMOVE_ITEM',
	payload: { itemId },
});
