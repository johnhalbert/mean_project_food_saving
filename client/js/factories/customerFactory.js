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