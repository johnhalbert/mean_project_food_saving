foodThingie.controller('vendorsController', function($scope, socket, $routeParams, vendorFactory, productFactory, orderFactory){

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
    	orderFactory.createOrder($scope.newOrder, function(addedOrder){

    	})
    }

    $scope.updateOrder = function(){

    }

})