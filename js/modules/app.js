(function() {
    //сперва надо создать модуль
    var app = angular.module('store', []);

    //далее создаю контроллер, для того, чтобы использовать инфу на странице
    app.controller('StoreController', function() {
        this.products = gems;
        console.log(Array.prototype.slice.call(this, arguments));
    });

    var gems = [
        {
            name: "gemName",
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
            soldOut: false,
            images: [{
                full: 'images/3.jpg'
            }]
        }
    ];
})();