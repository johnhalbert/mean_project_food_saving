foodThingie.controller('indiController', function($window, $scope, socket, $routeParams, customerFactory, vendorFactory, productFactory, orderFactory){
    $scope.cart = [];
    $scope.newOrder = {};
    $scope.products = {};

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
            console.log($scope.products);
            mapItOut(); // map out only AFTER vendor info (products) has been set
        }
    })

    /************************ GOOGLE MAPS ************************/

    var mapItOut = function() {
   
        var geocoder = new google.maps.Geocoder();

        var mapOptions = {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
    
        var encoded;
          var address = $scope.products.address;
          
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
                infoWindow.setContent('<h2>' + $scope.products.name + '</h2>' + marker.content);
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

    $scope.addItem = function(product_id){
        $scope.orderProduct = {};
        for (var i = 0; i < $scope.products.products.length; i++) {
            if ($scope.products.products[i]._id === product_id) {
                $scope.orderProduct.product = $scope.products.products[i];
            }
        }
        $scope.cart.push({product: $scope.orderProduct, quantity: $scope.newOrder.quantity});
        orderFactory.updateCart($scope.cart);
        console.log($scope.cart);
        $scope.orderProduct = {};
        $scope.newOrder = {};
    }
})