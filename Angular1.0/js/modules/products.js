(function() {
    //делаю этот модуль зависимостью для app.js (зависимость указал в app.js)
    var app = angular.module('store-products', []);

    //Создаю кастомные директивы
    app.directive('productTitle', function() {
        return {
            restrict: 'E', //уточняю что за тип директивы E - Element, использую когда хочу сделать отдельным элементом
            //restrict: 'A', //уточняю что за тип директивы A - Attribute, использую когда хочу сделать директиву кастомным атрибутом
            templateUrl: './htmlSnippets/price-title.html'
        };
    });


    app.directive('productDescription', function() {
        return {
            restrict: 'E',
            templateUrl: './htmlSnippets/product-description.html'
        };
    });


    app.directive('productSpecs', function() {
        return {
            restrict: 'E',
            templateUrl: './htmlSnippets/product-specs.html'
        };
    });


    app.directive('productReviews', function() {
        return {
            restrict: 'E',
            templateUrl: './htmlSnippets/product-reviews.html'
        };
    });

//Пример директивы с контроллером
//controller - key word сюда записываем функционал контроллера
//controllerAs - alias для контроллера
    app.directive('productPanel', function() {
        return {
            restrict: 'E',
            templateUrl: './htmlSnippets/product-panels.html',
            controller: function() {
                this.tab = 1;

                this.selectTab = function(setTab) {
                    this.tab = setTab;
                };

                this.isSelected = function(checkTab) {
                    return this.tab === checkTab;
                };
            },
            controllerAs: 'panel'
        };
    });


})();

