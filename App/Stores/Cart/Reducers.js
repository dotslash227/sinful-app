import { combineReducers } from 'redux';

const INITIAL_STATE = {
	restaurantId: null,
	items: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
	let items = [];
	switch (action.type) {
		case 'CART_SET_RESTAURANT_ID':
			console.log(action.payload);
			return { ...state, restaurantId: action.payload.restaurantId, items: [] };
			break;
		case 'CART_ADD_ITEM':
			items = state.items;
			items.push(action.payload.item);
			return { ...state, items };
			break;
		case 'CART_REMOVE_ITEM':
			let itemId = action.payload.itemId;
			items = state.items;
			const itemIndex = items.findIndex((item) => item.itemId === itemId);
			items = items.filter((item, index) => itemIndex !== index);
			return { ...state, items };
			break;
		default:
			return state;
	}
};

export default cartReducer;
