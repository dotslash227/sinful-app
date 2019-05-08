const faker = require('faker');
const fs = require('fs');

const data = [];

for (let i = 0; i < 9; i++) {
	data.push(generateMenuItems());
}
console.log(data);
fs.writeFile('./fake-menu-items.json', JSON.stringify(data), 'utf8', () => {});

function generateRestaurant() {
	return {
		id: faker.random.uuid(),
		name: faker.company.companyName(),
		placeName: faker.address.streetAddress(),
		pictureUrl: faker.image.imageUrl(80, 80, 'food', true),
		deliveryTime: faker.random.number({
			min: 20,
			max: 55,
		}),
	};
}

function generateMenuItems() {
	return {
		itemId: faker.random.uuid(),
		itemPicture: faker.image.imageUrl(150, 150, 'food', true),
		itemName: faker.commerce.productName(),
		itemPrice: faker.commerce.price(),
	};
}
