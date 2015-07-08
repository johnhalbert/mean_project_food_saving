foodThingie.config(function($routeProvider){
	$routeProvider
		.when('/', {
    		templateUrl: 'partials/home.html'
		})
        .when('/vendor', {
            templateUrl: 'partials/vendordashboard.html'
        })
        .when('/singleStore/:id', {
            templateUrl: 'partials/singleStorePartial.html'
        })
        .when('/restaurantList', {
            templateUrl: 'partials/restaurant_list.html'
        })
        .when('/groceryList', {
            templateUrl: 'partials/grocery_list.html'
        })
        .when('/about', {
            templateUrl: 'partials/about_us.html'
        })
    	.otherwise({redirectTo:'/'});
})