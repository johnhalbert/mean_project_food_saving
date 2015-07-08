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