var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Question: Do we want the product description to be required???

var ProductSchema = new mongoose.Schema({
	name: { type: String, required: 'Products must have a name' },
	image: { type: String },
	category: { type: String, required: 'Products must have a category' },
	description: { type: String },
	_vendor: { type: Schema.ObjectId, ref: 'Vendor' },
	price: { type: Number, required: 'Products must have a price' },
	quantity: { type: Number, required: 'Products must have an initial quantity' },
	num_ordered: { type: Number, default: 0},
	ageexpires: { type: Date, required: 'Customers must know when the product expires (roughly)'}
})

var Product = mongoose.model('Product', ProductSchema);