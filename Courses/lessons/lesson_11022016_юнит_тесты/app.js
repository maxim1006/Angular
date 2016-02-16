(function() {

    angular.module('app', []);

    angular.module('app')
        .directive("customEl", function(factory) {
            return {
                controller: function() {
                    this.prop = 123;
                },
                controllerAs: "customElCtrl"
            }
        });

    angular.module('app')
        .directive("customEl1", function(customEl) {
            return {
                controller: function() {
                    console.log(customEl);
                },
                controllerAs: "customElCtrl"
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