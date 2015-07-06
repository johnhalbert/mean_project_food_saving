var vendorController = require('../server/controllers/vendorController');
var orderController = require('../server/controllers/orderController');
var customerController = require('../server/controllers/customerController');
var productsController = require('../server/controllers/productController');

module.exports = function(app) {

	// Products Section

	app.get('products/:id/show', function(req, res){

	})

	app.get('/products/show', function(req, res){

	})

	app.post('/products/new', function(req, res){

	})

	// Orders Section

	app.get('/orders/:id/show', function(req, res){

	})

	app.get('/orders/show', function(req, res){

	})

	app.post('orders/new', function(req, res){

	})

	// Customers section

	app.get('/customers/:id/show', function(req, res){

	})

	app.get('/customers/show', function(req, res){

	})

	app.post('/customers/new', function(req, res){

	})

	// Vendors section

	app.get('/vendors/:id/show', function(req, res){

	})

	app.get('/vendors/show', function(req, res){

	})

	app.post('/vendors/new', function(req, res){
		
	})

}