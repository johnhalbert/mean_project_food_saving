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
                        text: 'Browser market shares January, 2015 to May, 2015'
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
                        name: "Brands",
                        colorByPoint: true,
                        data: [{
                            name: "Wasted Food",
                            y: 56.33
                        }, {
                            name: "Chrome",
                            y: 24.030000000000005,
                            sliced: true,
                            selected: true
                        }, {
                            name: "Firefox",
                            y: 10.38
                        }, {
                            name: "Safari",
                            y: 4.77
                        }, {
                            name: "Opera",
                            y: 0.9100000000000001
                        }, {
                            name: "Proprietary or Undetectable",
                            y: 0.2
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
    return factory;
})
//factory for products
foodThingie.factory("productFactory", function($http){
    var factory = {};
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
    return factory;
})
//factory for orders
foodThingie.factory("orderFactory", function($http){
    var factory = {};
    return factory;
})
//controller for pie chart
foodThingie.controller("piechart", function(piechartFactory){
})
//controller for dash
foodThingie.controller('DashCtrl', function($scope, socket){
})