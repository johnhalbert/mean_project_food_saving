foodThingie.controller('productsController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory){
    vendorFactory.getVendorInfo(function(data){
    $scope.vendor = data;
   })

    // productFactory.retrieveProductsOfVendor($scope.vendor, function(products){
    //         if (products.error) {
    //             console.log(products.error);
    //             $scope.error = products.error;
    //         } else {
    //             $scope.products = products;
    //             $window.location.href = '#/vendor';
    //         }
    //     })

    // $scope.addProduct = function(vend_id){
    //     $scope.addEditProduct.vendor_id = vend_id;
    //     productFactory.createProduct($scope.addEditProduct, function(product){
    //         console.log('this is here now');
    //       if (product.error) {
    //             console.log(product.error);
    //             $scope.error = product.error;
    //         } else {
    //             console.log('Success! (1)', product);
    //             $scope.addEditProduct = {};
    //         }
    //     })
    //     console.log('Success!', $scope.products);
    //   }


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