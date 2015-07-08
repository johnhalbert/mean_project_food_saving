foodThingie.controller('productsController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory){
    vendorFactory.getVendorInfo(function(data){
    $scope.vendor = data;
   })
})