var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Vendor = mongoose.model('Vendor');
var Customer = mongoose.model('Customer');

module.exports = {
	createOrder: function(req, res){
		Vendor.findOne({'_id': req.body.vendor_id}, function(err, vendor){
			Customer.findOne({'_id': req.body.customer_id}, function(err, customer){
				if (err) {
					console.log('Error creating new order (1)', err);
				} else {
					var newOrder = new Order({_vendor: vendor._id, _customer: customer._id, pickup_time: req.body.pickup_time, status: 'Pending'})
					order.save(function(err, result){
					    if(err){
						    res.send(err.message); 
					    } else {
						    console.log("Successfully added an order!");
						    res.send(result._id); // *** end the function to return
					    }
					})
				}
			})
		})
	},
	destroyOrder: function(req, res){
		Vendor.findOne({}, fucntion(err, vedor){
			if (err) {
				console.log('Error cancelling order (1)', err);
			} else {
				Order.findOne({sdfds}, function(err, order){
					if (err) {
						console.log('Error cancelling order (2)', err);
					} else {
						order.status = 'cancelled';
						for (var i = 0; i < vendor.products.length; i++) {
							for (var j = 0; j < order.products.length; j++) {
								if (vendor.products[i]._id === order.products[j]._id) {
									vendor.products[i].quantity += order.products[j].quantity;
								}
							}
						}
						order.save(function(err, order){
							if (err) {
								console.log('Error cancelling order (3)', err);
							} else {
								vendor.save(err, vendor){
									if (err) {
										console.log('Error cancelling order (4)', err);
									} else {
										res.end()
									}
								}
							}
						})
					}
				})
			}
		})
	},
	retrieveOrder: function(req, res){
		Order.find({_id: req.params.id}, function(err, results) {
		       	if(err) {
		         	console.log(err);
		       	} else {
		         	res.send(results);

		       	}
	   		})
	},
	retrieveOrders: function(req, res){
		Order.find({_customer: req.params.id}, function(err, results) {
		       	if(err) {
		         	console.log(err);
		       	} else {
		         	res.send(results);

		       	}
	   		})
	},
	updateOrder: function(req, res){
		Order.update(
				{_id : req.params.id},
				{req.body},
				function(err, numberAffected, rawResponse) {
		   			console.log('error', err);
		   			res.end();
		   		}
			)
	}
}