import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from 'App/Sagas';
import userReducer from './User/Reducers';

export default () => {
	const rootReducer = combineReducers({
		/**
		 * Register your reducers here.
		 * @see https://redux.js.org/api-reference/combinereducers
		 */
		user: userReducer,
	});

	return configureStore(rootReducer, rootSaga);
};
