import commonLib from 'App/Lib/common';
import firebase from 'react-native-firebase';

const auth = firebase.auth();
const db = firebase.firestore();
const profileDb = db.collection('Profile');

// Addresses:
import { validateAddress } from './address';

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
		const updateObj = {
			name: commonLib.normalizeString(name, 'name'),
			email: commonLib.normalizeString(email, 'email'),
		};
		const update = await profileDb.doc(String(uid)).update(updateObj);
		return updateObj;
	} catch (e) {
		commonLib.report(e.message);
		throw new Error(e.message);
	}
}

export async function addAddressToProfile(address) {
	try {
		const isValid = validateAddress(address);
		if (!isValid) throw new Error('InvalidAddress');
		const { uid } = getCurrentUser();
		const getUser = await profileDb.doc(String(uid)).get();
		if (!getUser.exists) throw new Error('InvalidUser');
		const profile = getUser.data();
		let addresses = profile.addresses || [];
		addresses.push(address);
		const update = await profileDb.doc(String(uid)).update({
			addresses,
		});
		return { addresses };
	} catch (e) {
		console.log(e);
		commonLib.report(e.message);
		throw new Error('UnexpectedError');
	}
	// TODO: Upload Address and Update State
}
