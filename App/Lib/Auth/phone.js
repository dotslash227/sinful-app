/*
	All Things related to Phone Auth
*/

import firebase from 'react-native-firebase';

// Utils:
import validatePhoneNumber from "./validatePhone";

export async function initiatePhoneAuth(phoneNumber) {
	try {
		const validPhoneNumber = await validatePhoneNumber(phoneNumber);
		if(!validatePhoneNumber) throw new Error("InvalidPhoneNumber");
		const confirmResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
		return confirmResult;
	} catch(e) {
		console.log(e);
		throw new Error("UnknownError");
	}
}

export async function validateOTP(confirmResult, otp) {
	try {
		const user = await confirmResult.confirm(otp);
		return user;
	} catch(e) {
		console.log(e);
		throw new Error("InvalidOTP");
	}
}