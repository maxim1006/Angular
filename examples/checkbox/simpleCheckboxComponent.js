angular.module('app').component('simpleCheckbox', {

        bindings: {
            nowrap: '@',
            exploreUrl: '@',
            visible: '<',
            idValue: '@',
            value: '=',
            valueCaption: '@',
            disabled: '@',
            caption: '@',
            description: '@',
            icon: '@',
            color: '@',
            validationMessages: '<'
        },

        controller: function ($scope, $element, $attrs) {

            var self = this;

            this.$onInit = function() {
            };


        },

        templateUrl: './simpleCheckbox.tpl.html'

    }
    
);