var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Vendor = mongoose.model('Vendor');

module.exports = {
	createProduct: function(req, res){
		console.log("333", req.body);
		Vendor.findOne({'_id': req.body.vendor_id}, function(err, vendor){
			if (err) {
				console.log('Error while creating product (1)', err);
			} else {
				var newProduct = new Product({name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, quantity: req.body.quantity, ageexpires: req.body.ageexpires, category: req.body.category, _vendor: req.body.vendor_id});
				newProduct.save(function(err, product){
					if (err) {
						console.log('Error creating new product (2)', err);
					} else {
						vendor.products.push(newProduct);
						vendor.save(function(err){
							if (err) {
								console.log('Error creating new product (3)', err);
							} else {
								res.json(product);
							}
						})
					}
				})
			}
		})
	},
	updateProduct: function(req, res){
		Product.findOne({'_id': req.params.id}, function(err, product){
			if (err) {
				console.log('Error updating product (1)', err);
			} else {
				product.name = req.body.name;
				product.image = req.body.image;
				product.description = req.body.description;
				product.price = req.body.price;
				product.quantity = req.body.quantity;
				product.ageexpires = req.body.ageexpires;
				product.save(function(err, product){
					if (err) {
						console.log('Error updating product (2)', err);
					} else {
						res.json(product);
					}
				})
			}
		})
	},
	retrieveProduct: function(req, res){
		Product.findOne({'_id': req.params.id}, function(err, product){
			if (err) {
				console.log('Error retrieving product', err);
			} else {
				res.json(product);
			}
		})
	},
	retrieveProducts: function(req, res){
		Vendor.find({}, function(err, products){
			if (err) {
				console.log('Error retrieving product list', err);
			} else {
				res.json(products);
			}
		})
	},
	retrieveProductsOfVendor: function(req, res){
		// console.log('retrieveProductsofVendor', req.params.id)
		// Vendor.findOne({_id: req.params.id})
		// 	.populate('products')
		// 	.exec(function(err, products){
		// 		console.log(products);
		// 		res.json(products);
		// 	})

		// We're hacks after all
		
		Product.find({_vendor: req.params.id}, function(err, products){
			if (err) {
				console.log('Error retrieving products list', err);
			} else {
				res.json(products);
			}
		})
	},
	destroyProduct: function(req, res){
		Product.remove({'_id': req.params.id}, function(err){
			if (err) {
				console.log('Error deleting product', err);
			} else {
				res.end();
			}
		})
	}
}