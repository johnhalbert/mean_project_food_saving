foodThingie.controller('checkoutController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory){
	$scope.example = {
       value: new Date(1970, 0, 1, 14, 57, 0)
     };

	console.log($routeParams.id);
    vendorFactory.retrieveVendor($routeParams.id, function(data){
    $scope.vendor = data;
	 })

})