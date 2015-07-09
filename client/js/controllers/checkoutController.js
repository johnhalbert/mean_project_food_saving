foodThingie.controller('checkoutController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory, orderFactory, customerFactory){
	
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
	mapItOut(); // show google maps
	 })

	$scope.stripeCallback = function (code, result) {
		console.log(result);
		console.log($scope.user);
	    if (result.error) {
	        window.alert('it failed! error: ' + result.error.message);
	    } else {
	        $scope.newOrder.vendor_id = $scope.vendor._id;
			for (var o = 0; o < $scope.cart.length; o++){
				$scope.newOrder.products = [];
				$scope.newOrder.quantities = [];
				$scope.newOrder.products.push($scope.cart[o].product.product._id);
				console.log('check quantities', $scope.cart[o]);
				$scope.newOrder.quantities.push($scope.cart[o].quantity);
			}
			orderFactory.createOrder($scope.newOrder, function(addedOrder){
				if (addedOrder.error) {
					console.log('Error creating new order');
				} else {
					socket.emit('new_order');
					console.log('Successfully added new order');
				}
			})
	    }
	};

	$scope.newOrder = {};
	customerFactory.retrieveLogin(function(customer){
		$scope.newOrder.customername = customer.name;
		$scope.newOrder.customeremail = customer.email;
	})

	$scope.addOrder = function(){
		$scope.newOrder.vendor_id = $scope.vendor._id;
		for (var o = 0; o < $scope.cart.length; o++){
			$scope.newOrder.products = [];
			$scope.newOrder.quantities = [];
			$scope.newOrder.products.push($scope.cart[o].product.product._id)
			$scope.newOrder.quantities.push($scope.cart[o].product.quantity);
			console.log('scope.neworder.quantities', $scope.newOrder.quantities);
		}
		orderFactory.createOrder($scope.newOrder, function(addedOrder){
			if (addedOrder.error) {
				console.log('Error creating new order');
			} else {
				console.log('Successfully added new order');
			}
		})
	}

	/************************ GOOGLE MAPS ************************/

    var mapItOut = function() {
   
        var geocoder = new google.maps.Geocoder();

        var mapOptions = {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
    
        var encoded;
          var address = $scope.vendor.address;
          
          geocoder.geocode( { 'address': address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              // map.setCenter(results[0].geometry.location);
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                encoded = results[0].geometry;
                $scope.map.setCenter(encoded.location);
                
                var infoWindow = new google.maps.InfoWindow();
                
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: encoded.location
                });
                marker.content = '<div class="infoWindowContent">' + address + '</div>';
            
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + $scope.vendor.name + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });

        $scope.openInfoWindow = function(e, selectedMarker){
            // e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

    }   
	
})