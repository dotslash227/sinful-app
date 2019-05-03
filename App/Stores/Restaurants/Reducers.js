import { combineReducers } from 'redux';

import restaurants from 'App/Data/fake-restaurants.json';

const INITIAL_STATE = {
  items: restaurants,
};

const restaurantsReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    default:
      return state;
  }
};

export default restaurantsReducer;
