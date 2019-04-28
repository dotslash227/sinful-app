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
  let newState;
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, ...action.payload };
    case 'USER_UPDATE_PROFILE':
      newState = { ...state, profile: { ...state.profile, ...action.payload } };
      return newState;
    case 'USER_UPDATE_ADDRESSES':
      newState = { ...state, profile: { ...state.profile, ...action.payload } };
      return newState;
    default:
      return state;
  }
};

export default userReducer;
