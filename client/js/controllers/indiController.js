foodThingie.controller('indiController', function($window, $scope, socket, $routeParams, customerFactory, vendorFactory, productFactory){
    $scope.cart = [];
    $scope.newOrder = {};

    // ************************
    // console.log('one');

    // var geocoder;
    // var map;

    // google.maps.event.addDomListener(window, 'load', $scope.initialize);
    // google.maps.event.addDomListener(window, 'load', $scope.codeAddress);


    // $scope.codeAddress = function() {
    //   console.log('two');
    //   var address = document.getElementById('address').innerHTML;
    //   console.log(address);
      
    //   geocoder.geocode( { 'address': address }, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       map.setCenter(results[0].geometry.location);
    //       var marker = new google.maps.Marker({
    //           map: map,
    //           position: results[0].geometry.location
    //       });
    //     } else {
    //       alert('Geocode was not successful for the following reason: ' + status);
    //     }
    //   });
    // }


    // $scope.initialize = function() {
    //     console.log('three');
    //   geocoder = new google.maps.Geocoder();
    //   $scope.codeAddress();
    //   var mapOptions = {
    //     zoom: 13,
    //   } 
    //   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    // }

   
    // ************************

    var geocoder = new google.maps.Geocoder();
    // var codedAddress;
    // var codeAddress = function() {
    //   console.log('two');
    //   var address = "1980 Zanker Road, San Jose, CA";
    //   // var address = document.getElementById('address').innerHTML;
    //   console.log(address);
      
    //   geocoder.geocode( { 'address': address }, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       // map.setCenter(results[0].geometry.location);
    //       console.log("here");
    //       return results[0].geometry;
    //       // var marker = new google.maps.Marker({
    //       //     map: map,
    //       //     position: results[0].geometry.location
    //       // });
    //     } else {
    //       alert('Geocode was not successful for the following reason: ' + status);
    //     }
    //   });
    // }


//     var cities = [
//     {
//         city : 'Toronto',
//         desc : 'This is the best city in the world!',
//         lat : 43.7000,
//         long : -79.4000
//     },
//     {
//         city : 'Las Vegas',
//         desc : 'Sin City...\'nuff said!',
//         lat : 36.0800,
//         long : -115.1522
//     }
// ];


    var mapOptions = {
        zoom: 15,
        // center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    // var cAdd = codeAddress();
    // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var encoded;
    var address = "1980 Zanker Road, San Jose, CA";
      // var address = document.getElementById('address').innerHTML;
      console.log(address);
      
      geocoder.geocode( { 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // map.setCenter(results[0].geometry.location);
          console.log("here222");
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          encoded = results[0].geometry;
          $scope.map.setCenter(encoded.location);
          // var marker = new google.maps.Marker({
          //     map: map,
          //     position: results[0].geometry.location
          // });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });






    // $scope.map.setCenter(encoded.location);


    
    $scope.markers = [];

    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: encoded.location
            // position: new google.maps.LatLng(info.lat, info.long),
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    // for (i = 0; i < cities.length; i++){
    //     createMarker(cities[i]);
    // }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }










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