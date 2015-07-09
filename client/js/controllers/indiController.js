foodThingie.controller('indiController', function($window, $scope, socket, $routeParams, customerFactory, vendorFactory, productFactory){
    $scope.pendingOrder = [];

    customerFactory.retrieveLogin(function(customer){
        if (customer) {
            $scope.customer = customer;
        } else {
            $window.location.href = '#/';
        }
    });

    var vendor = {};
    vendor._id = $routeParams.id
    productFactory.retrieveProductsOfVendor(vendor, function(products){
        if (products.error) {
            console.log(products.error);
            $scope.error = products.error;
        } else {
            $scope.products = products;
            console.log($scope.products)
        }
    })

    $scope.addItem = function(product_id){
        console.log("HERE", product_id);
        $scope.orderProduct = {};
        for (var i = 0; i < $scope.products.products.length; i++) {
            if ($scope.products.products[i]._id === product_id) {
                $scope.orderProduct.product = $scope.products.products[i];
            }
        }
        $scope.pendingOrder.push({product: $scope.orderProduct, quantity: $scope.newOrder.quantity});
        console.log($scope.pendingOrder);
        $scope.newOrder.products.push($scope.orderProduct._id);
        $scope.orderProduct = {};
    }
})