angular.module('app').component('materialButton', {

        bindings: {
            color: '@',
            size: '@',
            text: '@',
            type: '@',
            mod: '@',
            customClass: '@',
            disabled: '='
        },

        controller: function ($scope, $element, $attrs) {

            var self = this;

            this.$onInit = function() {
            };


        },

        templateUrl: './material/material-button.tpl.html'

    }
    
);