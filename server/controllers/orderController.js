var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Vendor = mongoose.model('Vendor');
var Customer = mongoose.model('Customer');

module.exports = {
	createOrder: function(req, res){
		console.log('createOrder in orderController.js');
		console.log(req.body);
		Vendor.findOne({_id: req.body.vendor_id}, function(err, vendor){
			Customer.findOne({email: req.body.customeremail}, function(err, customer){
				if (err) {
					console.log('Error creating new order (1)', err);
				} else {
					var newOrder = new Order({_vendor: req.body.vendor_id, _customer: customer._id, pickup_time: req.body.pickup_time, status: 'Pending' })
					for (var i = 0; i < req.body.products.length; i++) {
						newOrder.products.push(req.body.products[i]);
					}
					newOrder.save(function(err, result){
					    if(err){
						    res.send(err.message); 
					    } else {
					    	vendor.orders.push(newOrder);
					    	vendor.save(function(err){
					    		if (err) {
					    			console.log('Error creating new order (2)', err);
					    		} else {
					    			customer.orders.push(newOrder);
					    			customer.save(function(err){
					    				if (err) {
					    					console.log('Error creating new order (3)', err);
					    				} else {
										    console.log("Successfully added an order!");
					    					res.json(result);
					    				}
					    			})
					    		}
					    	})
					    }
					})
				}
			})
		})
	},
	destroyOrder: function(req, res){
		Vendor.findOne({_id: req.body.vendor_id}, function(err, vendor){
			if (err) {
				console.log('Error cancelling order (1)', err);
			} else {
				Order.findOne({_id: req.body.order_id}, function(err, order){
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
								vendor.save(function(err, vendor){
									if (err) {
										console.log('Error cancelling order (4)', err);
									} else {
										res.end()
									}
								})
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
	retrieveCustomerOrders: function(req, res){
		Customer.findOne({_id: req.params.id})
			.populate('orders')
			.exec(function(err, orders){
				if(err){
					console.log("Error retrieving orders for vendor", err);
				} else {
					res.json(orders);
				}
			})
	},
	retrieveVendorOrders: function(req, res){
		console.log('retrieveVendorOrders, orderController');
		Vendor.findOne({_id: req.params.id})
			.populate('orders')
			.exec(function(err, orders){
				if(err){
					console.log("Error retrieving orders for vendor (1)", err);
				} else {
					res.json(orders);
				}
			})
	},
	updateOrder: function(req, res){
		Order.update(
				{_id : req.params.id},
				req.body,
				function(err, numberAffected, rawResponse) {
					if (err) {
			   			console.log('Error updating order (1)', err);
			   		} else {
			   			Order.findOne({_id: req.params.id}, function(err, order){
			   				if (err) {
			   					console.log('Error updating order (2)', err);
			   				} else {
			   					res.json(order);
			   				}
			   			})
			   		}
		   		}
			)
	}
}