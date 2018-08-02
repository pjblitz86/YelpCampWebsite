var faker = require('faker');

for(var i=0; i<10; i++) {
  var rndProdName = faker.commerce.productName();
  var rntPrice = faker.commerce.price();
  console.log(`${rndProdName} - $${rntPrice}`);
}