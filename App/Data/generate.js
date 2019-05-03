const faker = require('faker');
const fs = require('fs');

const data = [];

for (let i = 0; i < 10; i++) {
	data.push({
		id: faker.random.uuid(),
		name: faker.company.companyName(),
		placeName: faker.address.streetAddress(),
		pictureUrl: faker.image.imageUrl(80, 80, 'food', true),
		deliveryTime: faker.random.number({
			min: 20,
			max: 55,
		}),
	});
}
console.log(data);
fs.writeFile('./fake-restaurants.json', JSON.stringify(data), 'utf8', () => {});
