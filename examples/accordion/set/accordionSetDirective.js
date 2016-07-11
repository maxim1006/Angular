angular.module('app').directive('accordionSet', function accordionSetDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        bindToController: {
            customListClass: "@",
            customClass: "@"
        },
        templateUrl: "set/accordion-set.tmpl.html",

        controller: function() {

            var self = this;

            self.items = [];

            self.addItem = function(item) {
                //item.opened = true; //open items by default

                self.items.push(item);

                //open just one
                // if(self.items.length === 1) {
                //     item.opened = true;
                // }
            };

            self.toggle = function(toggleItem) {

                self.items.forEach(function(item) {
                    //item.opened = false; //make just 1 opened

                    if (toggleItem === item) {
                        item.opened = !item.opened;
                    }
                });

            };

        },

        controllerAs: "accordionSetCtrl"
    }
});