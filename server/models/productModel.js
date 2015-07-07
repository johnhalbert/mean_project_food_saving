var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Question: Do we want the product description to be required???

var ProductSchema = new mongoose.Schema({
	name: { type: String, required: 'Products must have a name' },
	image: { type: String },
	description: { type: String },
	price: { type: Number, required: 'Products must have a price' },
	quantity: { type: Number, required: 'Products must have an initial quantity' },
	ageexpires: { type: Date, required: 'Customers must know when the product expires (roughly)'}
})

var Product = mongoose.model('Product', ProductSchema);