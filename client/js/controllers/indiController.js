foodThingie.controller('indiController', function($window, $scope, socket, $routeParams, customerFactory, vendorFactory, productFactory){
    $scope.cart = [];
    $scope.newOrder = {};

    // ************************

    var geocoder;
    var map;

    $scope.initialize = function() {
      geocoder = new google.maps.Geocoder();
      codeAddress();
      var mapOptions = {
        zoom: 13,
      } 
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    $scope.codeAddress = function() {
      
      var address = document.getElementById('address').value;
      console.log(address);
      
      geocoder.geocode( { 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }


    google.maps.event.addDomListener(window, 'load', $scope.initialize);
    google.maps.event.addDomListener(window, 'load', $scope.codeAddress);
    // ************************

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

    $scope.addItem = function(product_id){
        $scope.orderProduct = {};
        for (var i = 0; i < $scope.products.products.length; i++) {
            if ($scope.products.products[i]._id === product_id) {
                $scope.orderProduct.product = $scope.products.products[i];
            }
        }
        $scope.cart.push({product: $scope.orderProduct, quantity: $scope.newOrder.quantity});
        console.log($scope.cart);
        // $scope.newOrder.products.push($scope.orderProduct._id);
        $scope.orderProduct = {};
        $scope.newOrder = {};
    }
})