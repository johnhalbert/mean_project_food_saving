foodThingie.controller('infoController', function($window, $scope, socket, $routeParams, vendorFactory, customerFactory){

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            console.log(customer)
            $scope.customer = customer;
        } else {
            console.log(customer)
            $window.location.href = '#/';
        }
    })

   vendorFactory.retrieveVendors("restaurant", function(data){
        console.log(data);
      $scope.restaurants = data;
    })

    vendorFactory.retrieveVendors("grocery", function(data){
        console.log(data)
      $scope.groceries = data;
    })

})