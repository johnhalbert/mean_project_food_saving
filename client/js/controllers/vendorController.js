foodThingie.controller('vendorsController', function($scope, socket, $routeParams, vendorFactory, productFactory, orderFactory, customerFactory){

	$scope.newOrder = {};
	$scope.newOrder.products = [];
	$scope.pendingOrder = [];

   	vendorFactory.getVendorInfo(function(data){
		$scope.vendor = data;
		$scope.updateVendor = data;
   	})

    productFactory.retrieveProductsOfVendor($scope.vendor, function(products){
        if (products.error) {
            console.log(products.error);
            $scope.error = products.error;
        } else {
            $scope.products = products;
            console.log($scope.products);
        }
    })

    socket.on('update_orders', function(data){
        alert('New order received');
        orderFactory.retrieveVendorOrders($scope.vendor._id, function(orders){
            $scope.orders = orders;
            console.log('orderOfVendors', $scope.orders);
            for ($scope.i = 0; $scope.i < $scope.orders.orders.length; $scope.i++) {
                for ($scope.j = 0; $scope.j < $scope.orders.orders[$scope.i].products.length; $scope.j++) {
                    var productToGet = {};
                    productToGet._id = $scope.orders.orders[$scope.i].products[$scope.j];
                    console.log($scope.i, $scope.j);
                    productFactory.retrieveProduct(productToGet, function(product, idx1, idx2){
                        $scope.orders.orders[idx1].products[idx2] = product;
                        customerFactory.getSingleCustomer($scope.orders.orders[idx1]._customer, function(customer, idx1, idx2){
                            $scope.orders.orders[idx1]._customer = customer;
                        }, idx1, idx2)
                    }, $scope.i, $scope.j)
                }
            }
            console.log($scope.orders);
        })
    })

    orderFactory.retrieveVendorOrders($scope.vendor._id, function(orders){
    	$scope.orders = orders;
        console.log('orderOfVendors', $scope.orders);
        for ($scope.i = 0; $scope.i < $scope.orders.orders.length; $scope.i++) {
            for ($scope.j = 0; $scope.j < $scope.orders.orders[$scope.i].products.length; $scope.j++) {
                var productToGet = {};
                productToGet._id = $scope.orders.orders[$scope.i].products[$scope.j];
                console.log($scope.i, $scope.j);
                productFactory.retrieveProduct(productToGet, function(product, idx1, idx2){
                    $scope.orders.orders[idx1].products[idx2] = product;
                    customerFactory.getSingleCustomer($scope.orders.orders[idx1]._customer, function(customer, idx1, idx2){
                        $scope.orders.orders[idx1]._customer = customer;
                    }, idx1, idx2)
                }, $scope.i, $scope.j)
            }
        }
        console.log($scope.orders);
    })


    $scope.addProduct = function(vend_id){
        $scope.addEditProduct.vendor_id = vend_id;
        productFactory.createProduct($scope.addEditProduct, function(product){
          if (product.error) {
                console.log(product.error);
                $scope.error = product.error;
            } else {
            	$scope.products.products.push(product);
                $scope.addEditProduct = {};
            }
        })
    }

    $scope.updateVendorInfo = function(){
    	vendorFactory.updateVendor($scope.updateVendor, function(updatedVendor){
    		$scope.vendor = updatedVendor;
    	})
    }

    $scope.deleteProduct = function(product){
    	productFactory.destroyProduct(product, function(destroyedProduct){
    		$scope.products.products.splice($scope.products.products.indexOf(product),1);
    	})
    }

    $scope.updateProduct = function(product){
    	// Passing product to the form like this causes the data in the table to update automatically.
    	// We should try and fix this.
    	$scope.updateButton = true;
    	$scope.addEditProduct = product;
    }

    $scope.editProduct = function(product){
    	productFactory.updateProduct(product, function(returnedProduct){
    		$scope.products.products[$scope.products.products.indexOf(product)] = returnedProduct;
    		$scope.addEditProduct = {};
    		$scope.updateButton = false;
    	})
    }

    $scope.addOrder = function(){
    	$scope.newOrder.vendor_id = $scope.vendor._id;
    	orderFactory.createOrder($scope.newOrder, function(addedOrder){
    		if (addedOrder.error) {
    			console.log('Error adding new order', addedOrder.error);
    			$scope.error = addedOrder.error;
    		} else {
	    		$scope.newOrder = {};
	    		$scope.pendingOrder = {};
	    		$scope.orders.orders.push(addedOrder);
                customerFactory.getSingleCustomer($scope.orders.orders[$scope.orders.orders.length-1]._customer, function(customer, idx1, idx2){
                    $scope.orders.orders[$scope.orders.orders.length-1]._customer = customer; // pushed new order to array, update products and customer in that order with this loop.
                    for (var p = 0; p < $scope.orders.orders[$scope.orders.orders.length-1].products.length; p++) {
                    productFactory.retrieveProduct($scope.orders.orders[$scope.orders.orders.length-1].products[p], function(product, idx1, idx2){
                        $scope.orders.orders[$scope.orders.orders.length-1].products[idx1] = product;
                    }, p)
                }
                })
	    	}
    	})
    }

    $scope.addItem = function(){
    	for (var i = 0; i < $scope.products.products.length; i++) {
    		if ($scope.products.products[i]._id === $scope.orderProduct._id) {
    			$scope.orderProduct.product = $scope.products.products[i].name;
    		}
    	}
    	$scope.pendingOrder.push($scope.orderProduct);
    	$scope.newOrder.products.push($scope.orderProduct._id);
    	$scope.orderProduct = {};
    }

    $scope.removeItem = function(pendingItem){
    	console.log(pendingItem);
    	$scope.pendingOrder.splice($scope.pendingOrder.indexOf(pendingItem), 1);
    	$scope.newOrder.products.splice($scope.newOrder.products.indexOf(pendingItem._id),1);
    }

    $scope.editUpdateOrder = function(order){
        $scope.pendingOrder = [];
        $scope.newOrder = {};
        $scope.newOrder.products = [];
        $scope.updateOrderPresent = true;
        $scope.newOrder.customername = order._customer.name;
        $scope.newOrder.customeremail = order._customer.email;
        $scope.newOrder._id = order._id;
        for (var k = 0; k < order.products.length; k++) {
            $scope.newOrder.products.push(order.products[k]._id);
            $scope.pendingOrder.push({product: order.products[k].name, quantity: order.products[k].quantity});
        }
    }

    $scope.updateOrder = function(){
        orderFactory.updateOrder($scope.newOrder, function(updatedOrder){
            for (var x = 0; x < $scope.orders.orders.length; x++) {
                if ($scope.orders.orders[x]._id === $scope.newOrder._id) {
                    for (var y = 0; y < updatedOrder.products.length; y++) {
                        $scope.orders.orders[x].products[y] = updatedOrder.products[y];
                        productFactory.retrieveProduct($scope.orders.orders[x].products[y], function(product, idx1, idx2){
                            $scope.orders.orders[idx1].products[idx2] = product;
                            $scope.newOrder = {};
                            $scope.pendingOrder = {};
                        }, x, y);
                        if (updatedOrder.products.length < $scope.orders.orders[x].products.length) {
                            $scope.orders.orders[x].products.splice(($scope.orders.orders[x].products.length-1 - updatedOrder.products.length-1))
                        }
                    }
                } 
            }
        })
        $scope.updateOrderPresent = false;
    }

})