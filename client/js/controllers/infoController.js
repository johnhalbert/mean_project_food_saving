foodThingie.controller('infoController', function($window, $scope, socket, $routeParams, vendorFactory, customerFactory){

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            $scope.customer = customer;
        } else {
            $window.location.href = '#/';
        }
    })

   vendorFactory.retrieveVendors("restaurant", function(data){
      $scope.restaurants = data;
    })

    vendorFactory.retrieveVendors("grocery", function(data){
      $scope.groceries = data;
    })

})