var app = angular.module('app', []);

app.controller("myCtrl", function($scope, myFactory) {
    $scope.name = "Max";

    $scope.getName = function() {
        return $scope.name;
    };

    $scope.setName = function(str) {
        $scope.name = str;
    };

    $scope.myFactory = myFactory;
});

app.factory('myFactory', function() {
    return {
        hello: function() {
            return "hello";
        }
    }
});

