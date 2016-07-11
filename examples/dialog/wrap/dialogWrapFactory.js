angular.module('app').factory('dialogWrapFactory', function dialogWrapFactory() {

    var dialogWrapFactory = {};

    var _isOpened = false,
        _templateUrl,
        _params;


    dialogWrapFactory.open = function(url, params) {
        _templateUrl = url;
        _params = params;
        _isOpened = true;
    };


    dialogWrapFactory.close = function() {
        _templateUrl = null;
        _params = null;
        _isOpened = false;
    };


    dialogWrapFactory.getOpenState = function() {
        return _isOpened;
    };


    dialogWrapFactory.getTemplateUrl = function() {
        return _templateUrl;
    };

    dialogWrapFactory.getParams = function() {
        return _params;
    };


    return dialogWrapFactory;
});