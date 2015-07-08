foodThingie.controller('indiController', function($window, $scope, socket, $routeParams, customerFactory, vendorFactory, productFactory){

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            $scope.customer = customer;
        } else {
            $window.location.href = '#/';
        }
    });

    var vendor = {};
    vendor._id = $routeParams.id
    productFactory.retrieveProductsOfVendor(vendor, function(products){
        if (products.error) {
            console.log(products.error);
            $scope.error = products.error;
        } else {
            $scope.products = products;
            console.log($scope.products)
        }
    })

})