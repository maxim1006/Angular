angular.module('app').directive('tabsItem', function tabsItemDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            customTitle: '@',
            img: '<'
        },
        templateUrl: "item/tabs-item.tmpl.html",
        require: '^tabsSet',

        link: function(scope, elem, attr, tabsSetCtrl) {

            scope.active = false;
            tabsSetCtrl.addTab(scope);

        }
    }
});