var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = {
	createCustomer: function(req, res){
		var newCustomer = new Customer({name: req.body.name, email: req.body.email, password: req.body.password});
		newCustomer.save(function(err, customer){
			if (err) {
				console.log('Error creating new customer', err);
			} else {
				console.log('Successfully created new customer');
				res.json(customer);
			}
		})
	},
	updateCustomer: function(req, res){
		Customer.findOne({_id: req.params.id}, function(err, customer){
			if (err) {
				console.log('Error updating customer (1)', err);
			} else {
				customer.name = req.body.name;
				customer.email = req.body.email;
				customer.password = req.body.password;
				customer.save(function(err, customer){
					if (err) {
						console.log('Error updating customer (2)', err);
					} else {
						res.json(customer);
					}
				})
			}
		})
	},
	retrieveCustomer: function(req, res){
		Customer.findOne({_id: req.params.id}, function(err, customer){
			if (err) {
				console.log('Error retrieving customer');
			} else {
				res.json(customer);
			}
		})
	},
	retrieveCustomers: function(req, res){
		Customer.find({}, function(err, customers){
			if (err) {
				console.log('Error retrieving customer list', err);
			} else {
				res.json(customers);
			}
		})
	},
	loginCustomer: function(req, res){
		Customer.findOne({email: req.params.id}, function(err, customer){
			if (err) {
				console.log('Error logging in customer', err);
			} else if (customer) {
				console.log(customer);
				if (customer.email === req.body.email && customer.password === req.body.password) {
					res.json(customer);
				} else {
					res.json({error: 'Login failed'});
				}
			} else {
				res.json({error: 'Login failed'});
			}
		})
	}
}