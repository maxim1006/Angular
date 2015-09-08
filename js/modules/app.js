(function() {
    //������ ���� ������� ������
    var app = angular.module('store', []);

    //����� ������ ����������, ��� ����, ����� ������������ ���� �� ��������
    app.controller('StoreController', function() {
        this.products = gems;
        console.log(Array.prototype.slice.call(this, arguments));
    });

    //��� ���� ����������
    app.controller('PanelController', function() {
        this.tab = 1;

        this.selectTab = function(setTab) {
            this.tab = setTab;
        };

        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };
    });

    //������������� ���������� ����� ������ � �����������, � �� � ng-init
    app.controller("ReviewController", function() {
       this.review = {};

        this.addReview = function(product) {
            product.reviews.push(this.review);

            //�� �������� ��������
            this.review = {};
        };
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
            }],
            reviews: [
                {
                    stars: 5,
                    body: 'I love this product',
                    author: "love@mail.ru"
                },
                {
                    stars: 1,
                    body: 'I hate this product',
                    author: "hate@mail.ru"
                },
                {
                    stars: 3,
                    body: 'I middle this product',
                    author: "middle@mail.ru"
                }
            ]
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