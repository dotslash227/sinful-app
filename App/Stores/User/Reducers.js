import { combineReducers } from 'redux';

const INITIAL_STATE = {
  isLoggedIn: false,
  userId: null,
  profile: {
    name: null,
    email: null,
    addresses: [],
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      const newState = { ...this.state, ...action.payload };
      return newState;
    default:
      return state;
  }
};

export default userReducer;
