foodThingie.factory("orderFactory", function($http){

    var cart = [];

    var factory = {};

    factory.updateCart = function(updatedCart){
        cart = updatedCart;
    }

    factory.getCart = function(callback){
      callback(cart);
    }

    factory.createOrder = function(order, callback){
      console.log('createOrder in orderFactory');
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

    factory.retrieveVendorOrders = function(vendor, callback){
      console.log('retrieveVendorOrders, orderFactory');
      $http.get('/orders/'+vendor+'/vendor')
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