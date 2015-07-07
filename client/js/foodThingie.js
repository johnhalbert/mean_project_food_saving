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
		.otherwise({redirectTo:'/'});
})

//factory for pie chart
foodThingie.factory("piechartFactory", function(){
    var factory = {};
	$(function () {
    $('#container').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Food wasted by various sources, 2014'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Food Wasted',
            data: [
                ['Grocers',   45.0],
                ['Farmers',       26.8],
                {
                    name: 'Restaurants',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Individuals',    8.5],
                ['Hospitals',     6.2],
                ['Others',   0.7]
            ] 
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