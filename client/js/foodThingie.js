var foodThingie = angular.module('foodThingie', ['ngRoute']);

foodThingie.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/vendor', {
			templateUrl: 'partials/vendordashboard/html'
		})
})