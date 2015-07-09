var mongoose = require('mongoose');
var Vendor = mongoose.model('Vendor');

module.exports = {
	createVendor: function(req, res){
		var newVendor = new Vendor({name: req.body.name, type: req.body.type, address: req.body.address, phone: req.body.phone, hours: req.body.hours, email: req.body.email, password: req.body.password, start_hour: req.body.fromTime, end_hour: req.body.toTime});
		newVendor.save(function(err, vendor){
			if (err) {
				console.log('Error creating new vendor', err);
			} else {
				res.json(vendor);
			}
		})
	},
	updateVendor: function(req, res){
		Vendor.findOne({_id: req.params.id}, function(err, vendor){
			if (err) {
				console.log('Error while updating vendor (1)', err);
			} else {
				vendor.name = req.body.name;
				vendor.address = req.body.address;
				vendor.phone = req.body.phone;
				vendor.hours = req.body.hours;
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
		Vendor.findOne({_id: req.params.id}, function(err, vendor){
			if (err) {
				console.log('Error while retrieving vendor', err);
			} else {
				res.json(vendor);
			}
		})
	},
	loginVendor: function(req, res){
		Vendor.findOne({email: req.body.email}, function(err, vendor){
			if (err) {
				console.log('Error logging in vendor', err);
			} else if (vendor) {
				if (vendor.email === req.body.email && vendor.password === req.body.password){
					res.json(vendor);
				} else {
					res.json({error: 'Login failed'});
				}
			} else {
				res.json({error: 'Login failed'});
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