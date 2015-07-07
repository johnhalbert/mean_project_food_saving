var mongoose = require('mongoose');
var Vendor = mongoose.model('Vendor');

module.exports = {
	createVendor: function(req, res){
		var newVendor = new Vendor({name: req.body.name, type: req.body.type, address: req.body.address, phone: req.body.phone, hours: req.body.hours})
	},
	updateVendor: function(req, res){

	},
	retrieveVendor: function(req, res){

	},
	retrieveVendors: function(req, res){

	}
}