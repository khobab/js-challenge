var faker = require('faker');
exports.initDb = function(db) {
	var PRODUCT_COUNT = 10;
	var products = [];
	for(var i=0; i<PRODUCT_COUNT; i++) {
		products.push({
			id: faker.random.uuid(),
			name: faker.commerce.productName(),
			price: faker.commerce.price(),
			image: faker.image.image(),
			description: faker.lorem.sentence(),
			added : false
		});
	}

	db.collection("products").remove({});
	db.collection("products").insert(products);
	console.log("Database initialization is complete");
}