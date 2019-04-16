import commonLib from 'App/Lib/common';
import firebase from 'react-native-firebase';

async function getUserById(id) {
	try {
		const getUser = await db
			.collection('Users')
			.doc(String(id))
			.get();
		if (!getUser.exists) return null;
		else return getUser.data();
	} catch (e) {
		commonLib.report(e);
		return null;
	}
}
