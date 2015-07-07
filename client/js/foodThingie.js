var foodThingie = angular.module('foodThingie', ['ngRoute']);

foodThingie.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.otherwise({redirectTo:'/'});

})

foodThingie.controller("piechart", function(piechartFactory){

})
foodThingie.factory("piechartFactory", function(){
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
	var factory = {};

	return factory;
})