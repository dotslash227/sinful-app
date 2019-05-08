import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from 'App/Sagas';

// Reducers
import userReducer from './User/Reducers';
import restaurantsReducer from './Restaurants/Reducers';
import cartReducer from './Cart/Reducers';

export default () => {
	const rootReducer = combineReducers({
		/**
		 * Register your reducers here.
		 * @see https://redux.js.org/api-reference/combinereducers
		 */
		user: userReducer,
		restaurants: restaurantsReducer,
		cart: cartReducer,
	});

	return configureStore(rootReducer, rootSaga);
};
