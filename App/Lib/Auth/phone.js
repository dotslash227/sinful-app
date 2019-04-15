/*
	All Things related to Phone Auth
*/

import common from 'App/Lib/common';
import firebase from 'react-native-firebase';

// Utils:
import validatePhoneNumber from './validatePhone';

export async function initiatePhoneAuth(phoneNumber) {
	try {
		const validPhoneNumber = await validatePhoneNumber(phoneNumber);
		if (!validatePhoneNumber) throw new Error('InvalidPhoneNumber');
		const confirmResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
		return confirmResult;
	} catch (e) {
		common.report(e);
		throw new Error('UnknownError');
	}
}

export async function validateOTP(confirmResult, otp) {
	try {
		const user = await confirmResult.confirm(otp);
		return user;
	} catch (e) {
		common.report(e);
		throw new Error('InvalidOTP');
	}
}
