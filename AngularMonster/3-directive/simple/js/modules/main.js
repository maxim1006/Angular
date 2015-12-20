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
    return {
        //restrict: 'A',
        //restrict: 'E',
        //restrict: 'EA' - по умолчанию
        link: function(scope, element, attrs) {
            var text = element.text();
            element.text(text + " добавленный в конец текст")
            console.log(element[0]);
        }
    }
});