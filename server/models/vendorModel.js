var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VendorSchema = new mongoose.Schema({
	name: { type: String, required: 'You must include your company name' },
	email: { type: String, index: { unique: true }, required: 'You must include your company email' },
	password: { type: String, required: 'You must choose a password' },
	type: { type: String, required: 'You must specify either restaurant or store' },
	address: { type: String, required: 'You must include your company address' },
	phone: { type: String, required: 'You must include your company phone number' },
	hours: { type: String, required: 'You must include your store hours' },
	start_hour: {type: Date},
	end_hour: {type: Date},
	products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
	created: { type: Date, default: Date.now }
});

var Vendor = mongoose.model('Vendor', VendorSchema);