var app = angular.module('app', []);

//По умолчанию $scope директивы наследует скоуп контроллера в котором находится
app.controller("MainController", function($scope) {
    console.log($scope);
    $scope.names = ["Max", "Aliya"];

    $scope.getNames = function() {
        return $scope.names;
    };

    $scope.name = "Max";
});

app.directive("custom", function() {
    return {
        //scope: false, //делает значение скоупа директивы по умолчанию, т.е. скоуп директивы будет такой в какой контроллер директива вставлена. Минус этого подхода в том, что можно внутри директивы исправить переменные контроллера, чтобы этого избежать делаю публичные методы
        scope: true, //создается new scope, который наследуется от скоупа контроллера (т.е. скоуп контроллера попадает в прото). Этот способ предпочтительный, так как изолирует скоупы директивы и контроллера, хотя и при нем можно из директивы добраться до контроллера
        template: "<ul><li ng-repeat='name in getNames()'>{{name}}</li></ul><input type='text' ng-model='name'>{{name}}",
        link: function($scope, element, attrs) {
            console.log($scope);
        }
    };
});