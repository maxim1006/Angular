(function() {
    //сперва надо создать модуль
    var app = angular.module('store', []);

    //далее создаю контроллер, для того, чтобы использовать инфу на странице
    app.controller('StoreController', function() {
        this.products = gems;
        console.log(Array.prototype.slice.call(this, arguments));
    });

    //еще один контроллер
    app.controller('PanelController', function() {
        this.tab = 1;

        this.selectTab = function(setTab) {
            this.tab = setTab;
        };

        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        }
    });

    var gems = [
        {
            name: "first gemName",
            price: 2.95,
            description: 'gem description',
            canPurchase: false,
            soldOut: false,
            images: [{
                full: 'images/1.jpg'
            }]
        },
        {
            name: "second gemName",
            price: 5,
            description: 'second gem description',
            canPurchase: false,
            soldOut: false,
            images: [{
                full: 'images/2.jpg'
            }]
        },
        {
            name: "third gemName",
            price: 1.9,
            description: 'third gem description',
            canPurchase: false,
            soldOut: true,
            images: [{
                full: 'images/3.jpg'
            }]
        }
    ];
})();