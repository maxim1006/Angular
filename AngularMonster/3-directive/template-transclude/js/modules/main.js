var app = angular.module('app', []);


//короткий вариант
//app.directive("custom", function() {
//    return function(scope, element, attrs) {
//        console.log(scope);
//        console.log(element);
//        console.log(attrs);
//    }
//});


//полный
app.directive("custom", function() {

    var family = [
        {
            id: 1,
            name: "Max"
        },
        {
            id: 2,
            name: "Aliya"
        },
        {
            id: 3,
            name: "Liliya"
        }];

    return {
        //restrict: 'A',
        restrict: 'E',
        //restrict: 'EA' - по умолчанию
        template: "<div ng-repeat='part in family'>{{part.id}} {{part.name}} <!--<div ng-transclude></div>-->", //могу вставить transclude в темплейт, с помощью ng-transclude, а могу использовать как отдельную функцию в link
        transclude: true, //нужно, чтобы показать исходное содержимое директивы, тут использую его в link
        link: function(scope, element, attrs, ctrl, transclude) {
            //тут все пихаю в скоуп, чтобы мог этим пользоваться в шаблоне для директивы.
            scope.family = family;
            //scope - это скоуп директивы, а clone - это то что написали в кастомную директиву + ангулар оборачивает это в спан, если внутренности кастомной директивы ни во что не обернуты
            transclude(scope, function(clone) {
                console.log("clone", clone);
                console.log("scope", scope);

                scope.name = "Anton";

                element.append(clone);
            });
        }
    }
});


app.controller("mainCtrl", function() {
   //this.name = "Anton";
});