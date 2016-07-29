angular.module('app').factory('simpleStatusFactory', function simpleStatusFactory() {

    var factory = {};

    factory.status = {
        pending: "pending",
        success: "success",
        error: "error"
    };

    return factory;

});