import firebase from 'react-native-firebase';
const crashlytics = firebase.crashlytics();

// Report
function report(e, extra = {}) {
	console.log(e);
	crashlytics.recordError(extra.code || 500, e.message || e);
}

function normalizeString(data, type = 'string') {
	let cleaned = String(data);
	switch (type) {
		case 'email':
			cleaned = String(data).toLowerCase();
			break;
		case 'name':
			cleaned = String(cleaned).replace(/\b\w/g, (l) => l.toUpperCase());
			break;
		default:
			return String(data);
	}
	return cleaned;
}

export default {
	report,
	normalizeString,
};
