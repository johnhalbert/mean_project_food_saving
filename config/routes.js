var vendorController = require('../server/controllers/vendorController');
var orderController = require('../server/controllers/orderController');
var customerController = require('../server/controllers/customerController');
var productController = require('../server/controllers/productController');

module.exports = function(app) {

	console.log('exporting routes!');

	/***************** Products *****************/

	app.get('/products/:id/show', function(req, res){
		productController.retrieveProduct(req, res);
	})

	app.get('/products/show', function(req, res){
		productController.retrieveProducts(req, res);
	})

	app.get('/products/:id/vendor', function(req, res){
		productController.retrieveProductsOfVendor(req, res);
	})

	app.post('/products/new', function(req, res){
		productController.createProduct(req, res);
	})

	app.post('/products/:id/update', function(req, res){
		productController.updateProduct(req, res);
	})

	app.post('/products/:id/destroy', function(req, res){
		productController.destroyProduct(req, res);
	})

	/***************** Orders *****************/

	app.get('/orders/:id/vendor', function(req, res){
		orderController.retrieveVendorOrders(req, res);
	})

	app.get('/orders/:id/customer', function(req, res){
		orderController.retrieveCustomerOrder(req, res);
	})

	app.get('/orders/show', function(req, res){
		orderController.retrieveOrders(req, res);
	})

	app.post('/orders/new', function(req, res){
		console.log('/orders/new in routes.js');
		orderController.createOrder(req, res);
	})

	app.post('/orders/:id/update', function(req, res){
		orderController.updateOrder(req, res);
	})

	app.post('/orders/:id/destroy', function(req, res){
		orderController.destroyOrder(req, res);
	})

	/***************** Customers *****************/

	app.get('/customers/:id/show', function(req, res){
		customerController.retrieveCustomer(req, res);
	})

	app.post('/customers/:id/show', function(req, res){
		customerController.loginCustomer(req, res);
	})

	app.get('/customers/show', function(req, res){
		customerController.retrieveCustomers(req, res);
	})

	app.post('/customers/new', function(req, res){
		customerController.createCustomer(req, res);
	})

	app.post('/customers/:id/update', function(req, res){
		customerController.updateCustomer(req, res);
	})

	/***************** Vendors *****************/

	app.post('/vendors/:id/update', function(req, res){
		vendorController.updateVendor(req, res);
	})

	app.post('/vendors/:id/show', function(req, res){
		vendorController.loginVendor(req, res);
	})

	app.post('/vendors/new', function(req, res){
		console.log('Im in /vendors/new');
		vendorController.createVendor(req, res);
	})

	app.get('/vendors/show/:id', function(req, res){
		vendorController.retrieveVendors(req, res);
	})

	app.get('/vendors/:id/show', function(req, res){
		vendorController.retrieveVendor(req, res);
	})

}