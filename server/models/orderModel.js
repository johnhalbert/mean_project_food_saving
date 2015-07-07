var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
	_vendor: { type: Schema.ObjectId, ref: 'Vendor' },
	_customer: { type: Schema.ObjectId, ref: 'Customer' },
	products: [{ 
		product_id: { type: String },
		quantity: Number,
		}],
	total: { type: Number },
	created: { type: Date, default: Date.now }

})

var Order = mongoose.model('Order', OrderSchema);