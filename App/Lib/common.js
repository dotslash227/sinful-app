import firebase from 'react-native-firebase';
const crashlytics = firebase.crashlytics();

// Report
function report(e, extra = {}) {
	console.log(e);
	crashlytics.recordError(extra.code || 500, e.message || e);
}

export default {
	report,
};
