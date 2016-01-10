var app = angular.module('app', []);
//$templateCache - сервис, с его помощью могу следить за загруженными шаблонами
app.run(function($templateCache, $timeout) {
    console.log($templateCache);
    console.log($templateCache.get("bookmarks.html"));

    $timeout(function() {
        console.log("$timeout", $templateCache.info());
        console.log($templateCache.get("bookmarks.html"));
    }, 100);
});

app.directive("custom", function($templateCache) {
    return {
        transclude: true,
        templateUrl: "bookmarks.html",
        link: function(scope, elem, attrs, ctrl, transclude) {
            //это кеш шаблона - объект с методами get put и т.д.
            //console.log($templateCache.info()); //могу посмотреть сколько шаблонов в кеше сейчас

        }
    };
});

app.directive("custom1", function($templateCache) {
    return {
        transclude: true,
        templateUrl: "bookmarks.html",
        link: function(scope, elem, attrs, ctrl, transclude) {
            //это кеш шаблона - объект с методами get put и т.д.
            //console.log($templateCache.get("bookmarks.html")); //могу посмотреть сколько шаблонов в кеше сейчас

        }
    };
});

