angular.module('app').directive('tabsSet', function tabsSetDirective() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        bindToController: {
            customListClass: "@",
            customTabsSetClass: "@"
        },
        templateUrl: "set/tabs-set.tmpl.html",

        controller: function() {

            var self = this;

            self.tabs = [];

            self.addTab = function(tab) {
                self.tabs.push(tab);

                if(self.tabs.length === 1) {
                    tab.active = true;
                }
            };

            self.select = function(selectedTab) {
                angular.forEach(self.tabs, function(tab) {
                    if(tab.active && tab !== selectedTab) {
                        tab.active = false;
                    }
                });

                selectedTab.active = true;
            };

        },

        controllerAs: "tabsSetCtrl"
    }
});