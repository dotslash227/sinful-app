/*
	All Things related to Phone Auth
*/

import commonLib from './../common.js';
import firebase from 'react-native-firebase';

// Utils:
import validatePhoneNumber from './validatePhone';

async function initiatePhoneAuth(phoneNumber) {
	try {
		const validPhoneNumber = await validatePhoneNumber(phoneNumber);
		if (!validatePhoneNumber) throw new Error('InvalidPhoneNumber');
		const confirmResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
		return confirmResult;
	} catch (e) {
		//console.log(e);
		commonLib.report(e);
		throw new Error('UnknownError');
	}
}

async function validateOTP(confirmResult, otp) {
	try {
		const user = await confirmResult.confirm(otp);
		return user;
	} catch (e) {
		commonLib.report(e);
		throw new Error('InvalidOTP');
	}
}

async function resendOTP(phoneNumber) {
	const confirmResult = await initiatePhoneAuth(phoneNumber);
	return confirmResult;
}

export { initiatePhoneAuth, resendOTP, validateOTP };
