import { combineReducers } from 'redux';

const INITIAL_STATE = {
  isLoggedIn: false,
  profile: {
    userId: null,
    name: null,
    email: null,
    addresses: [],
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
