var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VendorSchema = new mongoose.Schema({
	name: { type: String, required: 'You must include your company name' },
	type: { type: String, required: 'You must specify either restaurant or store' },
	address: { type: String, required: 'You must include your company address' },
	phone: { type: String, required: 'You must include your company phone number' },
	hours: { type: String, required: 'You must include your store hours' },
	created: { type: Date, default: Date.now }
});

var Vendor = mongoose.model('Vendor', VendorSchema);