var app = angular.module('app', []);

app.directive('myCtrl', function() {
    return {
         controller: function($scope, myFactory) {
             this.name = "Max";
             this.age = 27;

             //чтобы использовать фабрику, нужно поместить ее в scope
             this.myFactory = myFactory;
             console.log($scope);
         },
        controllerAs: "$ctrl"
    }

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