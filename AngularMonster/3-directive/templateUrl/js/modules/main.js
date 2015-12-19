var app = angular.module('app', []);

app.directive("custom", function() {
    return {
        transclude: true,
        templateUrl: "bookmarks.html",
        link: function(scope, elem, attrs) {
        }
    };
});

