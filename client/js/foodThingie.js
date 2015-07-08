/********************************* ROUTES *********************************/

var foodThingie = angular.module('foodThingie', ['ngRoute','nvd3ChartDirectives']);

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
    	.otherwise({redirectTo:'/'});
})

//factory for pie chart
foodThingie.factory("piechartFactory", function(){
    var factory = {};
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

/********************************* VENDOR FACTORY *********************************/

foodThingie.factory("vendorFactory", function($http){

    var vendor;

    var factory = {};

    factory.createVendor = function(newVendor, callback){
        console.log('creating vendor!');
        $http.post('/vendors/new', newVendor)
          .success(function(createdVendor){
            vendor = createdVendor;
            callback(createdVendor);
          })
    }
    factory.getVendorInfo = function(callback){
      callback(vendor);
    }
    factory.updateVendor = function(updateVendor, callback){
      $http.post('/vendors/'+updatedVendor._id+'/update', updateVendor)
        .success(function(updatedVendor){
          vendor = updatedVendor;
          callback(updatedVendor);
        })
    }

    factory.getVendor = function(vendorSearch, callback) {
        console.log(vendorSearch);
        $http.post('/vendors/'+vendorSearch.email+'/show', vendorSearch)
            .success(function(foundVendor){
                vendor = foundVendor;
                callback(foundVendor);
            })
    }

    factory.retrieveVendor = function(vendorSearch, callback){
      $http.get('/vendors/'+vendorSearch+'/show')
        .success(function(foundVendor){
          callback(foundVendor);
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

/********************************* PRODUCTS FACTORY *********************************/

foodThingie.factory("productFactory", function($http){
    
    var factory = {};

    factory.createProduct = function(product, callback){
        console.log("222", product);
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

    factory.retrieveProductsOfVendor = function(vendor, callback){
      $http.get('/products/'+vendor._id+'/vendor')
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
/********************************* CUSTOMERS FACTORY *********************************/

foodThingie.factory("customerFactory", function($http){

    var customer;

    var factory = {};

    factory.addCustomer = function(newCustomer, callback){
        $http.post('/customers/new', newCustomer).success(function(results){
            console.log('added customer');
            customer = results;
            callback(results);
        })
    }

    factory.updateCustomer = function(id, callback){
        $http.post('/customers/'+id+'/update').success(function(results){
            console.log('updated customer');
            customer = results;
            callback(results);
        })
    }

    factory.retrieveCustomer = function(customer, callback){
        $http.get('/customers/show').success(function(results){
            console.log("got customer");
            customer = results;
            callback(results);
        })
    }

    factory.getCustomer = function(customerLogin, callback){
        $http.post('/customers/'+customerLogin.email+'/show', customerLogin)
            .success(function(customerLoggedIn){
                customer = customerLoggedIn;
                callback(customerLoggedIn);
            })
    }

    factory.getCustomers = function(callback){
        $http.get('/customers/show').success(function(results){
            console.log("got all customers");
            customer = results;
            callback(results);
        })
    }

    factory.retrieveLogin = function(callback){
        callback(customer);
    }

    return factory;
})

/********************************* ORDERS FACTORY *********************************/

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

/********************************* PIE CHART CONTROLLER *********************************/

foodThingie.controller("piechart", function($scope, piechartFactory){
  $scope.exampleData = [
        { key: "Europe", y: 620 },
        { key: "North America and Oceania", y: 650 },
        { key: "Industrialized Asia", y: 530 },
        { key: "sub-Saharan Africa", y: 350 },
        { key: "North Africa, West and Central Asia", y: 474 },
        { key: "South and Southeast Asia", y: 276 },
        { key: "Latin America", y: 496 }
      ];
  $scope.xFunction = function(){
    return function(d) {
        return d.key;
    };
}
  $scope.yFunction = function(){
  return function(d){
    return d.y;
  };
}
  $scope.toolTipContentFunction = function(){
    return function(key, x, y, e, graph) {
        return '<p>' + "Region: " + key + '</p>' +
              '<p>' +  x + ' lbs/yr ' + '</p>'
    }
  }
})

/********************************* LOGIN/REGISTRATION CONTROLLER *********************************/

foodThingie.controller('login_regController', function($window, $scope, socket, $routeParams, vendorFactory, customerFactory, productFactory){

  $scope.addCustomer = function(){
    customerFactory.addCustomer($scope.newCustomer, function(customer){
      if(customer.error){
        console.log(customer.error);
        $scope.error = customer.error
      }else{
        $scope.customer = customer;
        console.log($scope.customer);
      }
    })
  }
  $scope.addVendor = function(){
    var fromTime = new Date($scope.newVendor.fromTime);
    var toTime = new Date($scope.newVendor.toTime);

    $scope.newVendor.hours = '';
    if (fromTime.getHours() > 12) {
        $scope.newVendor.hours += (fromTime.getHours()-12)+":";
        if (fromTime.getMinutes() < 10) {
            $scope.newVendor.hours += "0"+fromTime.getMinutes();
        } else {
            $scope.newVendor.hours += fromTime.getMinutes();
        }
        $scope.newVendor.hours += $scope.newVendor.hours += " PM - ";
    } else {
        $scope.newVendor.hours += fromTime.getHours()+":";
        if (fromTime.getMinutes() < 10) {
            $scope.newVendor.hours += "0"+fromTime.getMinutes();
        } else {
            $scope.newVendor.hours += fromTime.getMinutes();
        }
        $scope.newVendor.hours += " AM - ";
    }
    if (toTime.getHours() > 12) {
        $scope.newVendor.hours += (toTime.getHours()-12)+":";
        if (toTime.getMinutes() < 10) {
            $scope.newVendor.hours += "0"+toTime.getMinutes();
        } else {
           $scope.newVendor.hours += toTime.getMinutes();
        }
        $scope.newVendor.hours += " PM";
    } else {
        $scope.newVendor.hours += toTime.getHours()+":";
        if (toTime.getMinutes() < 10) {
            $scope.newVendor.hours += "0"+toTime.getMinutes()
        } else {
            $scope.newVendor.hours += toTime.getMinutes();
        }
        $scope.newVendor.hours += " AM";
    }
    vendorFactory.createVendor($scope.newVendor, function(vendor){
      if (vendor.error) {
        $scope.newVendor = {};
        console.log(vendor.error);
        $scope.error = vendor.error;
      } else {
        $scope.newVendor = {};
        $scope.vendor = vendor;
        $window.location.href = '#/vendor';
      }
    })
    console.log("dsfds");
  }

  $scope.retrieveCustomer = function(){
    customerFactory.getCustomer($scope.customerLogin, function(customer){
        if (customer.error) {
            $scope.customerLogin = {};
            console.log(customer.error);
            $scope.error = customer.error;
        } else {
            $scope.customerLogin = {};
            console.log(customer);
            $scope.customer = customer;
        }
    })
  }

  $scope.retrieveVendor = function(){
    vendorFactory.getVendor($scope.vendorLogin, function(vendor){
        if (vendor.error) {
            $scope.vendorLogin = {};
            console.log(vendor.error);
            $scope.error = vendor.error;
        } else {
            $scope.vendor = vendor;
            console.log("YO", vendor);
            $scope.vendorLogin = {};
            $scope.updateVendor = vendor;
            productFactory.retrieveProductsOfVendor($scope.vendor, function(products){
                if (products.error) {
                    console.log(products.error);
                    $scope.error = products.error;
                } else {
                    console.log('Success!', products);
                    $scope.products = products;
                    $window.location.href = '#/vendor';
                }
            })
            $scope.updateButton = false; // hide update button
            $window.location.href = '#/vendor';
        }
    })
  }

  $scope.logout = function(){
    $window.location.href = '/';
  }

})
//controller for dash
foodThingie.controller('DashCtrl', function($scope, socket){

})


/********************************* VENDOR / PRODUCTS CONTROLLER *********************************/

foodThingie.controller('infoController', function($window, $scope, socket, $routeParams, vendorFactory, customerFactory){

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            console.log(customer)
            $scope.customer = customer;
        } else {
            console.log(customer)
            $window.location.href = '#/';
        }
    })

   vendorFactory.retrieveVendors("restaurant", function(data){
        console.log(data);
      $scope.restaurants = data;
    })

    vendorFactory.retrieveVendors("grocery", function(data){
        console.log(data)
      $scope.groceries = data;
    })

})
//controller for individual store/restaurant
foodThingie.controller('indiController', function($window, $scope, socket, $routeParams, customerFactory, vendorFactory){

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            $scope.customer = customer;
        } else {
            $window.location.href = '#/';
        }
    });

    vendorFactory.retrieveVendor($routeParams.id, function(vendor){
        $scope.vendor = vendor;
        console.log($scope.vendor);
    })

})
//controller for cutomers
foodThingie.controller('customersController', function($scope, socket, $routeParams){

})
//controller for vendors
foodThingie.controller('vendorsController', function($scope, socket, $routeParams, vendorFactory){
   vendorFactory.getVendorInfo(function(data){
    $scope.vendor = data;
    $scope.updateVendor = data;
   })
})

/********************************* PRODUCTS CONTROLLER *********************************/
   
foodThingie.controller('productsController', function($window, $scope, socket, $routeParams, productFactory, vendorFactory){
    $scope.products = [];
    vendorFactory.getVendorInfo(function(data){
    $scope.vendor = data;
   })

    // set outside of function scope so products are populated on page load
    productFactory.retrieveProductsOfVendor($scope.vendor, function(products){
              console.log('getting products', $scope.vendor);
            if (products.error) {
                console.log(products.error);
                $scope.error = products.error;
            } else {
                console.log('Success!', products);
                $scope.products = products;
                $window.location.href = '#/vendor';
            }
        })

    $scope.addProduct = function(vend_id){
        console.log("111", vend_id);
        $scope.addEditProduct.vendor_id = vend_id;
        productFactory.createProduct($scope.addEditProduct, function(product){
          if (product.error) {
                console.log(product.error);
                $scope.error = product.error;
            } else {
                console.log('Success! (1)', product);
                $scope.addEditProduct = {};

                productFactory.retrieveProductsOfVendor($scope.vendor, function(products){
                    console.log('loggin scope in addProduct',$scope.vendor);
                    if (products.error) {
                        console.log(products.error);
                        $scope.error = products.error;
                    } else {
                        console.log('Success! (2)', products);
                        $scope.products = products;
                        $window.location.href = '#/vendor';
                    }
                })

                $window.location.href = '#/vendor';
            }
        })
      }


    $scope.updateProduct = function(){
        productFactory.updateProduct($scope.addEditProduct, function(product){
            if (product.error) {
                console.log(product.error);
                $scope.error = product.error;
            } else {
                console.log('Success!', product);
                $scope.addEditProduct = {}; // set form fields to empty
                $scope.updateButton = false; // hide update button
                $window.location.href = '#/vendor';
            }
        })
    }

    $scope.retrieveProduct = function(req, res){
        productFactory.retrieveProduct(req.body, function(product){
            if (product.error) {
                console.log(product.error);
                $scope.error = product.error;
            } else {
                console.log('Success!', product);
                $scope.addEditProduct = product; // populate form
                $scope.updateButton = true; // show update button
                $window.location.href = '#/vendor';
            }
        })
    }
     


  
})

