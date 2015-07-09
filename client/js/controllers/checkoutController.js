foodThingie.controller('checkoutController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory, orderFactory){
	
	orderFactory.getCart(function(customerCart){
		$scope.cart = customerCart;
		$scope.cart.total = new Number();
		for (var i = 0; i < $scope.cart.length; i++){
			$scope.cart[i].product.total = $scope.cart[i].product.product.price * $scope.cart[i].quantity;
			$scope.cart.total += +$scope.cart[i].product.product.price;
			console.log($scope.cart.total, $scope.cart[i].product.product.price);
		}
		console.log($scope.cart);
	})

	$scope.example = {
       value: new Date(1970, 0, 1, 14, 57, 0)
     };
     // $scope.vendor = {};
    vendorFactory.retrieveVendor($routeParams.id, function(data){
    $scope.vendor = data;
    console.log($scope.vendor);
    var maxtime = new Date($scope.vendor.end_hour)
	var maxhours = maxtime.getHours()
	maxhours = maxhours - 2;
	
	var maxminutes = maxtime.getMinutes()
	endtime = (maxhours * 60) + maxminutes;
	console.log(maxhours, maxminutes, endtime);
	var mintime = new Date($scope.vendor.start_hour)
	var minhours = mintime.getHours();
	var minminutes = mintime.getMinutes()
	starttime = (minhours * 60) + minminutes;
	console.log(minhours, minminutes, starttime);
	var totalhours = (endtime - starttime)/60;
	var length = totalhours + 1;
	$scope.arr = [];
	for(i=1;i<length;i++){
		if(i+minhours>12){
			$scope.arr.push(i+minhours-12 + ":00 pm")
			$scope.arr.push(i+minhours-12 + ":30 pm")
		}else if(i+minhours==12){
			$scope.arr.push(i+minhours + ":00 pm")
			$scope.arr.push(i+minhours + ":30 pm")
		}
		else{
		$scope.arr.push(i+minhours + ":00 am");
		$scope.arr.push(i+minhours + ":30 am");
		}
	}
	console.log($scope.arr);
	 })
	
})