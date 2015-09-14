(function() {
    //сперва надо создать модуль,
    //указываю что store модуль зависит от 'store-products'
    var app = angular.module('store', ['store-products']);


    //далее создаю контроллер, для того, чтобы использовать инфу на странице
    //во втором аргументе указываю какие сервисы нужны для данного контроллера
    app.controller('StoreController', ['$http', function($http) {
        //для того, чтобы получить данные использую сервисы,
        //$http - сервис для получения json
        //$log - для логирования сообщений
        //$filter - профильтровать array
        /*this.products = gems;*/

        //$http({method: "GET", url: '/gems.json'});
        //$http.get('/gems.json', {apiKey: 'myApiKey'});
        console.log(this.products);

        var self = this;

        //так как этот код сработает до того как загрузится json, нам не нужны ошибки, поэтому приравниваю к массиву.
        self.products = [];

        $http.get('./gems.json').success(function(data) {
            self.products = data;
        });
    }]);


    //еще один контроллер, перенес в директивы
    /*app.controller('PanelController', function() {
        this.tab = 1;

        this.selectTab = function(setTab) {
            this.tab = setTab;
        };

        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };
    });*/


    //Инициализацию параметров лучше делать в контроллере, а не в ng-init
    app.controller("ReviewController", function() {
       this.review = {};

        this.addReview = function(product) {
            product.reviews.push(this.review);

            //не забываем обнулять
            this.review = {};
        };
    });


    //вынес директивы productTitle и productPanel, касающиеся product в product.js


    //Вынес gems в json файл
    //var gems = ...
})();