(function() {

    angular.module('app', []);

    angular.module('app')
        .directive("customEl", function(factoryCustom) {
            return {
                controller: function() {
                    this.prop = 123;
                },
                link: function(scope) {
                    scope.method = function() {
                        return factoryCustom.get();
                    };
                },
                scope: {},
                controllerAs: "customElCtrl"
            }
        });

    angular.module('app')
        .directive("customEl1", function(factoryCustom) {
            return {
                controller: function() {
                },

                controllerAs: "customEl1Ctrl"
            }
        });

    angular.module('app')
        .factory("factoryCustom", function() {
            return {
                prop: "factory prop",
                get: function() {
                    return 1;
                }
            };
        });

    angular.module('app')
        .factory("factoryGet", function($http) {
            return {
                get: function() {
                    return $http.get("users.json").then(function(response) {
                        return response.data;
                    });
                },
                getOne: function() {
                    return $http.get("user.json").then(function(response) {
                        return response.data;
                    });
                }
            };
        });

    angular.module('app')
        .controller("controllerCustom", function(factoryCustom) {
            this.prop = factoryCustom.get() + 1;
        });

})();