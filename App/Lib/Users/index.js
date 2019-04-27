import commonLib from 'App/Lib/common';
import firebase from 'react-native-firebase';

const auth = firebase.auth();
const db = firebase.firestore();
const profileDb = db.collection('Profile');

function getCurrentUser() {
	return firebase.auth().currentUser;
}

export async function getUserProfile() {
	try {
		const { uid } = getCurrentUser();
		const getUser = await db
			.collection('Profile')
			.doc(String(uid))
			.get();
		if (!getUser.exists) return await createEmptyUserProfile(uid);
		else return getUser.data();
	} catch (e) {
		commonLib.report(e);
		return null;
	}
}

async function createEmptyUserProfile(id) {
	try {
		const emptyProfile = {
			email: null,
			name: null,
			addresses: [],
		};
		const createUser = await profileDb.doc(String(id)).set(emptyProfile);
		return emptyProfile;
	} catch (e) {
		commonLib.report(e);
		return emptyProfile;
	}
}

export async function updateProfileDetails({ name, email }) {
	try {
		const { uid } = getCurrentUser();
		const update = await profileDb.doc(String(uid)).update({
			name: commonLib.normalizeString(name, 'name'),
			email: commonLib.normalizeString(email, 'email'),
		});
	} catch (e) {
		commonLib.report(e.message);
		throw new Error(e.message);
	}
}
