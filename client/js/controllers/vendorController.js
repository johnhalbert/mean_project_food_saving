foodThingie.controller('vendorsController', function($scope, socket, $routeParams, vendorFactory, productFactory){

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

})