angular.module('app').directive('accordionItem', function accordionItemDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            customTitle: '@',
            img: '<'
        },
        templateUrl: "item/accordion-item.tmpl.html",
        require: '^accordionSet',

        link: function(scope, elem, attr, accordionSetCtrl) {

            scope.toggle = function(item) {
                accordionSetCtrl.toggle(item);
            };

            accordionSetCtrl.addItem(scope);

            scope.item = scope;

        }
    }
});