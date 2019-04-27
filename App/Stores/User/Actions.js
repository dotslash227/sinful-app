export const loginUser = ({ profile, userId }) => ({
	type: 'LOGIN_USER',
	payload: { isLoggedIn: true, profile, userId },
});
