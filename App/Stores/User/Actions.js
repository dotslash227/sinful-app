export const loginUser = ({ profile, userId }) => ({
	type: 'LOGIN_USER',
	payload: { isLoggedIn: true, profile, userId },
});

export const updateUserProfile = ({ name, email }) => ({
	type: 'USER_UPDATE_PROFILE',
	payload: { name, email },
});

export const updateAddresses = ({ addresses }) => ({
	type: 'USER_UPDATE_ADDRESSES',
	payload: { addresses },
});

export const logoutUser = () => ({
	type: 'LOGOUT_USER',
	payload: {},
});
