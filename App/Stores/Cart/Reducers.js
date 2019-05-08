import { combineReducers } from 'redux';

const INITIAL_STATE = {
	restaurantId: null,
	items: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
	let newState;
	switch (action.type) {
		default:
			return state;
	}
};

export default cartReducer;
