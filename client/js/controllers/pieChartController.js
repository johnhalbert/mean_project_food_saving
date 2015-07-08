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