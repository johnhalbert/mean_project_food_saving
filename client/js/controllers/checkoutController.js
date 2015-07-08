foodThingie.controller('productsController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory){
	console.log($routeParams.id);
    vendorFactory.retrieveVendor($routeParams.id, function(data){
    $scope.vendor = data;
	 })

})