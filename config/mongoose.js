var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/foodThingie');

require('../server/models/vendorModel');
require('../server/models/productModel');
require('../server/models/customerModel');
require('../server/models/orderModel');