/*
	Address Object:
	{
		name, houseNo, address, geoLoc: { lat: 1, lng: 1 }
	}
*/

export async function validateAddress({ name, houseNo, address, geoLoc }) {
	if (!name || !houseNo || !address || !geoLoc) return false;
	if (!geoLoc.lat || !geoLoc.lng) return false;
	return true;
}
