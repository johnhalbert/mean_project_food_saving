foodThingie.controller('infoController', function($window, $scope, socket, $routeParams, vendorFactory, customerFactory){

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            $scope.customer = customer;
        } else {
            console.log(customer)
            // $window.location.href = '#/'; // deleted so that users can see
            // list of restaurants and grocery stores even without logging in
        }
    })

   vendorFactory.retrieveVendors("restaurant", function(data){
      $scope.restaurants = data;
    })

    vendorFactory.retrieveVendors("grocery", function(data){
      $scope.groceries = data;
    })

})