foodThingie.controller('vendorsController', function($scope, socket, $routeParams, vendorFactory, productFactory, orderFactory){

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
        }
    })

    orderFactory.retrieveVendorOrders($scope.vendor._id, function(orders){
    	$scope.orders = orders;
    	console.log('$scope.orders', $scope.orders);
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
    		$scope.products.products.splice($scope.products.products.indexOf(product), 1);
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
    	console.log('addOrder in vendorController');
    	$scope.newOrder.vendor_id = $scope.vendor._id;
    	orderFactory.createOrder($scope.newOrder, function(addedOrder){
    		if (addedOrder.error) {
    			console.log('Error adding new order', addedOrder.error);
    			$scope.error = addedOrder.error;
    		} else {
	    		$scope.newOrder = {};
	    		$scope.pendingOrder = {};
	    		$scope.orders.orders.push(addedOrder);
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

    $scope.updateOrder = function(){

    }

})