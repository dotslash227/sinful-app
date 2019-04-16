import firebase from 'react-native-firebase';
const crashlytics = firebase.crashlytics();

// Report
export function report(e, extra = {}) {
	console.log(e);
	crashlytics.recordError(extra.code || 500, e.message || e);
}
