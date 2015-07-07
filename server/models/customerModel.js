var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new mongoose.Schema({
	name: { type: String, required: 'You must enter your name' },
	email: { type: String, required: 'You must enter a valid email' },
	password: { type: String, required: 'You must include a password' },
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order'}],
	credit_card_number: Number,
	created: { type: Date, default: Date.now }
})

var Customer = mongoose.model('Customer', CustomerSchema);