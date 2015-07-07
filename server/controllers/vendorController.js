var mongoose = require('mongoose');
var Vendor = mongoose.model('Vendor');

module.exports = {
	createVendor: function(req, res){
		var newVendor = new Vendor({name: req.body.name, type: req.body.type, address: req.body.address, phone: req.body.phone, hours: req.body.hours});
		newVendor.save(function(err, vendor){
			if (err) {
				console.log('Error creating new vendor', err);
			} else {
				res.json(vendor);
			}
		})
	},
	updateVendor: function(req, res){
		Vendor.findOne({'_id': req.params.id}, function(err, vendor){
			if (err) {
				console.log('Error while updating vendor (1)', err);
			} else {
				vendor.name: req.body.name;
				vendor.address: req.body.address;
				vendor.phone: req.body.phone;
				vendor.hours: req.body.hours;
				vendor.save(function(err, vendor){
					if (err) {
						console.log('Error while updating vendor (2)', err);
					} else {
						res.json(vendor);
					}
				})
			}
		})
	},
	retrieveVendor: function(req, res){
		Vendor.findOne({'_id': req.params.id}, function(err, vendor){
			if (err) {
				console.log('Error while retrieving vendor', err);
			} else {
				res.json(vendor);
			}
		})
	},
	retrieveVendors: function(req, res){
		Vendor.find({type:req.params.id}, function(err, vendors){
			if (err) {
				console.log('Error while retrieving vendor list', err);
			} else {
				res.json(vendors);
			}
		})
	}
}