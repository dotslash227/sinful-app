import commonLib from 'App/Lib/common';
import firebase from 'react-native-firebase';

const db = firebase.firestore();
const profileDb = db.collection('Profile');

export async function getUserProfileById(id) {
	try {
		const getUser = await profileDb.doc(String(id)).get();
		if (!getUser.exists) return null;
		else return getUser.data();
	} catch (e) {
		commonLib.report(e);
		return null;
	}
}

export async function createEmptyUserProfile(id) {
	try {
		const emptyProfile = {
			email: null,
			name: null,
			addresses: [],
		};
		const createUser = await db
			.collection('Profile')
			.doc(String(id))
			.set(emptyProfile);
		return emptyProfile;
	} catch (e) {
		commonLib.report(e);
		return emptyProfile;
	}
}
