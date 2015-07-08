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
            $window.location.href = '#/vendor';
        }
    })
  }

  $scope.logout = function(){
    $window.location.href = '/';
  }

})