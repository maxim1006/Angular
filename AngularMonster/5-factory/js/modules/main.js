var app = angular.module('app', []);

app.controller('myCtrl', function($scope, myFactory) {
    $scope.name = "Max";
    $scope.age = 27;

    //чтобы использовать фабрику, нужно поместить ее в scope
    $scope.myFactory = myFactory;
    console.log($scope);
});

app.controller('myCtrl2', function($scope, myFactory) {
    $scope.name = "Aliya";
    $scope.age = 28;
    $scope.myFactory = myFactory;
    console.log($scope);
});

//для биндинга 2х контроллеров (если хочу их связать каким-то образом) используется фабрика, она хранит в себе данные, которые можно использовать в нескольких контроллерах одновременно.

app.factory('myFactory', function() {
    return {
        hello: "hello"
    };
});