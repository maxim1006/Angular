(function() {
    var app = angular.module('app', []);

    app.controller('CarouselController', ['$http', '$element', function($http, $element) {

        var self = this;

        const ITEM_WIDTH  = 320;


        self.images = [];
        self.pos = 0;
        self.visibleItems = findVisisbleItemsNumber();


        /**
         * Get images
         */
        $http.get('./carouselItems.json').success(function(data) {
            self.images = data.images;
            self.length = self.images.length;
            self.info = data.info;
        });


        /**
         * Prev click
         */
        self.goLeft = function() {
            self.pos--;

            if (self.pos < 0) self.pos = 0;
            changePosition();
        };


        /**
         * Next click
         */
        self.goRight = function() {
            var rightEdge = self.length - self.visibleItems;

            self.pos++;

            if (self.pos > rightEdge) self.pos = rightEdge;
            changePosition();
        };


        /**
         * set carousel position
         */
        function changePosition() {
            self.position = {'transform': 'translate3d(' + -self.pos * ITEM_WIDTH + 'px,0,0)'};
        }


        /*helpers*/
        function findVisisbleItemsNumber() {
            var carouselList = $element.find('.carousel__list'),
                w = carouselList.outerWidth(true);

            return Math.ceil(w/ITEM_WIDTH);
        }
    }]);
})();