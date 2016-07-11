angular.module('app').directive('dialogWrap', function dialogWrapDirective(dialogWrapFactory) {
    return {
        scope: {},
        bindToController: {
            modificator: "@"
        },
        templateUrl: "./wrap/dialog-wrap.tmpl.html",

        controller: function($scope) {
            var self = this;

            self.storage = dialogWrapFactory;

            self.close = function() {
                dialogWrapFactory.close();
                $scope.$broadcast("clearDialog", []);
            };

            self.show = function() {
                return dialogWrapFactory.getOpenState();
            };

            self.dialogParams = function() {
                return dialogWrapFactory.getParams();
            };
        },

        link: function(scope, elem, attrs, ctrl) {
            scope.$on('$destroy', function() {
                elem.off('click', onWrapperClick);
            });

            elem.on('click', onWrapperClick);

            function onWrapperClick(e) {
                var $dialog = elem.find('.jsDialogBody');

                if ($dialog[0] !== e.target && !$dialog[0].contains(e.target)) {
                    ctrl.close();
                    scope.$digest();
                }
            }
        },

        controllerAs: "dialogWrapCtrl"
    }
});