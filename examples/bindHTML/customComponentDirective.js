"use strict";

    angular.module('app', ['ngSanitize'])
        .directive('bindHtmlCompile', function ($compile) {
            return {
                link: function (scope, element, attrs) {

                    scope.$watch(function () {
                        return scope.$eval(attrs.bindHtmlCompile);
                    }, function (value) {

                        element.html(value && value.toString());

                        var compileScope = scope;

                        if (attrs.bindHtmlScope) {
                            compileScope = scope.$eval(attrs.bindHtmlScope);
                        }

                        $compile(element.contents())(compileScope);
                    });

                }
            };
        })
        .directive('customComponent', function() {
            return {

                scope: {},

                bindToController: {
                },

                controller: function ($sce) {

                    var self = this;

                    self.renderHTML = function(html) {
                        return $sce.trustAsHtml(html);
                    };

                    self.html = '<div class="some-class">HTML bind through bindHtmlCompile</div>';

                    self.html1 = '<div class="some-class1">HTML bind through sce</div>';

                },

                link: function($scope, element, attrs, $ctrl) {

                },

                controllerAs: "$ctrl",

                template: `
                    <div class="custom-component" bind-html-compile="$ctrl.html"></div>
                    <div class="custom-component" ng-bind-html="$ctrl.renderHTML($ctrl.html1)"></div>
                `

            }
        });