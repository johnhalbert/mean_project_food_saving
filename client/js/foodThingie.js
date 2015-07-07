var foodThingie = angular.module('foodThingie', ['ngRoute']);

foodThingie.config(function($routeProvider){
	$routeProvider
		.when('/', {
		templateUrl: 'partials/home.html'
		})
        .when('/vendor', {
        templateUrl: 'partials/vendordashboard.html'
        })
        .when('/singleStore', {
        templateUrl: 'partials/singleStorePartial.html'
        })
        .when('/restaurantList', {
        templateUrl: 'partials/restaurant_list.html'
        })
        .when('/groceryList', {
        templateUrl: 'partials/grocery_list.html'
		.otherwise({redirectTo:'/'});
})

//factory for pie chart
foodThingie.factory("piechartFactory", function(){
    var factory = {};
	$(function () {
                $('#container').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Data Provided by FeedingAmerica.org'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: "Food Waste",
                        colorByPoint: true,
                        colors: ['#AE3B41', '#3D347B'],
                        data: [{
                            name: "Wasted Food",
                            y: 40,
                            sliced: true,
                            selected: true
                        }, {
                            name: "Consumed",
                            y: 60
                        }]
                    }]
                });
            });
    return factory;
})
//end factory-pie chart

//socket factory
foodThingie.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
    	console.log(eventName, data);
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
    sock: socket
  };
});
//end socket factory

//factory for vendors
foodThingie.factory("vendorFactory", function($http){
    var factory = {};

    factory.createVendor = function(vendor, callback){
        $http.post('/vendors/new', vendor)
          .success(function(vendor){
            callback(vendor);
          })
    }

    factory.updateVendor = function(vendor, callback){
      $http.post('/vendors/'+vendor._id+'/update', vendor)
        .success(function(vendor){
          callback(vendor);
        })
    }

    factory.retrieveVendor = function(vendor, callback){
      $http.get('/vendors/'+vendor._id+'/show')
        .success(function(vendor){
          callback(vendor);
        })
    }

    factory.retrieveVendors = function(type, callback){
      $http.get('/vendors/show/'+type)
        .success(function(vendors){
          callback(vendors);
        })
    }

    return factory;
})
//factory for products
foodThingie.factory("productFactory", function($http){
    
    var factory = {};

    factory.createProduct = function(product, callback){
      $http.post('/products/new', product)
        .success(function(product){
          callback(product);
        })
    }

    factory.updateProduct = function(product, callback){
      $http.post('/products/'+product._id+'/update', product)
        .success(function(product){
          callback(product);
        })
    }

    factory.retrieveProduct = function(product, callback){
      $http.get('/products/'+product._id)
        .success(function(product){
          callback(product);
        })
    }

    factory.retrieveProducts = function(callback){
      $http.get('/products')
        .success(function(products){
          callback(products);
        })
    }

    factory.destroyProduct = function(product, callback){
      $http.post('/products/'+product._id+'/destroy')
        .success(function(product){
          callback(product);
        })
    }

    return factory;

})
//factory for customers
foodThingie.factory("customerFactory", function($http){
    var factory = {};

    factory.addCustomer = function(customer, callback){
        $http.post('/add_customer', customer).success(function(results){
            console.log('added customer');
            callback(results);
        })
    }

    factory.updateCustomer = function(id, callback){
        $http.post('/customers/'+id+'/update').success(function(results){
            console.log('updated customer');
            callback(results);
        })
    }

    factory.getCustomer = function(id, callback){
        $http.get('/customers/'+id+'/show').success(function(results){
            console.log("got customer");
            callback(results);
        })
    }

    factory.getCustomers = function(callback){
        $http.get('/customers/show').success(function(results){
            console.log("got all customers");
            callback(results);
        })
    }
    return factory;
})
//factory for orders
foodThingie.factory("orderFactory", function($http){

    var factory = {};

    factory.createOrder = function(order, callback){
      $http.post('/orders/new', order)
        .success(function(order){
          callback(order);
        })
    }

    factory.destroyOrder = function(order, callback){
      $http.post('/orders/'+order._id+'/destroy', order)
        .success(function(order){
          callback(order);
          // This will probably change.
        })
      }

    factory.retrieveOrder = function(order, callback){
      $http.get('/orders/'+order._id)
        .success(function(order){
          callback(order);
        })
    }

    factory.retrieveOrders = function(callback){
      $http.get('/orders')
        .success(function(orders){
          callback(orders);
        })
    }

    factory.updateOrder = function(order, callback){
      $http.post('/orders/'+order._id+'/update', order)
        .success(function(order){
          callback(order);
        })
    }
  
    return factory;

})
//controller for pie chart
foodThingie.controller("piechart", function(piechartFactory){

})
//controller for login/registration
foodThingie.controller('login_regController', function($scope, socket, $routeParams){
  $scope.addCustomer = function(){
    customerFactory.addCustomer($scope.newCustomer, function(data){
      if(data){
        console.log("error")
      }else{
        $scope.customer = data;
      }
    })
  }  
})
//controller for dash
foodThingie.controller('DashCtrl', function($scope, socket){

})
//controller for vendor/products information
foodThingie.controller('infoController', function($scope, socket, $routeParams){

})
//controller for individual store/restaurant
foodThingie.controller('indiController', function($scope, socket, $routeParams){

})
//controller for cutomers
foodThingie.controller('customersController', function($scope, socket, $routeParams){

})
//controller for vendors
foodThingie.controller('vendorsController', function($scope, socket, $routeParams){
  $scope.retrieveRestaurants = function(){
    vendorFactory.retrieveVendors("restaurant", function(data){
      $scope.restaurants = data;
    })
  }
})
//future products controller ######################################
foodThingie.controller('productsController', function($scope, socket, $routeParams){

})
































