foodThingie.controller('indiController', function($window, $scope, socket, $routeParams, customerFactory, vendorFactory, productFactory){

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            $scope.customer = customer;
        } else {
            $window.location.href = '#/';
        }
    });

    vendorFactory.retrieveVendor($routeParams.id, function(vendor){
        $scope.vendor = vendor;
        console.log($scope.vendor);
        productFactory.retrieveProductsOfVendor($scope.vendor, function(products){
              console.log('getting products', $scope.vendor);
            if (products.error) {
                console.log(products.error);
                $scope.error = products.error;
            } else {
                console.log('Success!', products);
                $scope.products = products;
            }
        })
    })

})