angular.module('app').component('simpleStatus', {

        bindings: {
            status: "<",
            successText: "<",
            errorText: "@",
            pendingText: "@"
        },

        controller: function ($scope, $element, $attrs, $timeout, simpleStatusFactory) {

            var self = this;

            this.$onInit = function () {

                self.storage = simpleStatusFactory;

                self.getText = function () {
                    var text;

                    switch (self.status) {
                        case simpleStatusFactory.status.pending || "pending":
                            text = self.pendingText || "Pending";
                            self.show();
                            break;

                        case simpleStatusFactory.status.success || "success":
                            text = self.successText || "Success";
                            self.fade();
                            break;

                        case simpleStatusFactory.status.error || "error":
                            text = self.errorText || "Error";
                            break;

                        default:
                            text = null;
                            break;
                    }

                    return text;
                };

                self.getStatus = function () {
                    return self.status;
                };

                self.fade = function () {
                    $element.addClass('_faded');
                };

                self.show = function () {
                    $element.removeClass('_faded');
                };

            };


        },

        templateUrl: './simple/simple-status.tmpl.html'
    });