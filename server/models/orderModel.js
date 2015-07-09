var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
	_vendor: { type: Schema.ObjectId, ref: 'Vendor' },
	_customer: { type: Schema.ObjectId, ref: 'Customer' },
	products: [{
		type: Schema.Types.ObjectId, 
		ref: 'Product',
	}],
	quantities: [{ type: Number }],
	pickup_time: Date,
	status: String,
	total_price: Number,

	created: { type: Date, default: Date.now }

})

var Order = mongoose.model('Order', OrderSchema);