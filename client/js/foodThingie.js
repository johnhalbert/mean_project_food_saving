var foodThingie = angular.module('foodThingie', ['ngRoute','nvd3ChartDirectives', 'angularPayments']);

foodThingie.run(function($window) {
    $window.Stripe.setPublishableKey('pk_test_37LXrjVN6ohka3S86cLX2e1C');
});
