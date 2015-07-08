foodThingie.controller('productsController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory){
    vendorFactory.getVendorInfo(function(data){
    $scope.vendor = data;
   })

    $scope.updateProduct = function(){
        productFactory.updateProduct($scope.addEditProduct, function(product){
            if (product.error) {
                console.log(product.error);
                $scope.error = product.error;
            } else {
                console.log('Success!', product);
                $scope.addEditProduct = {}; // set form fields to empty
                $scope.updateButton = false; // hide update button
                $window.location.href = '#/vendor';
            }
        })
    }

    $scope.retrieveProduct = function(req, res){
        productFactory.retrieveProduct(req.body, function(product){
            if (product.error) {
                console.log(product.error);
                $scope.error = product.error;
            } else {
                console.log('Success!', product);
                $scope.addEditProduct = product; // populate form
                $scope.updateButton = true; // show update button
                $window.location.href = '#/vendor';
            }
        })
    }
     


  
})