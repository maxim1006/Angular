angular.module('app').directive('simpleSelect', function simpleSelectDirective($timeout, $document) {
    return {
        scope: {},
        bindToController: {
            options: '<',
            currentValue: '=',
            internal: '<',
            type: '@'
        },

        controller: function ($scope, $element, $attrs, $timeout) {
            var self = this;

            self.isOpened = false;

            $scope.$watch(function() {return self.options}, function(newVal, oldVal) {
                if (newVal) {
                    self.currentValue = self.currentValue ? self.currentValue : newVal[0];
                }
            });

            self.onItemClick = function(option) {
                self.currentValue = option;
                self.isOpened = !self.isOpened;
            };

            self.getCurrentName = function() {
                return (self.currentValue && self.currentValue.name) || self.options[0].name;
            };
        },

        controllerAs: "simpleSelectCtrl",

        link: function(scope, element, attrs, ctrl) {

            var $selectBody = element.find('.simple-select__body'),
                $selectHeader = element.find('.simple-select__header'),
                $body = angular.element('body');

            //append selectBody to body
            if (!ctrl.internal) {
                $body.append($selectBody);
            }

            ctrl.onHeaderClick = function() {

                if (!ctrl.options || !ctrl.options.length) return;

                //set Position of select
                if (!ctrl.isOpened && !ctrl.internal) {
                    $body.append($selectBody);

                    $selectBody.css({
                        'top': $selectHeader.offset().top,
                        'left': $selectHeader.offset().left,
                        'width': $selectHeader.outerWidth(),
                        'marginTop': $selectHeader.height() + 5
                    });
                }

                ctrl.isOpened = !ctrl.isOpened;
            };


            $document
                .on('click.select', onDocumentClick)
                .on('keydown.select', onDocumentKeyDown);




            scope.$on('$destroy', function() {
                $selectBody.remove();
                $document.off('click.select', onDocumentClick);
            });

            //helpers
            function onDocumentClick(event) {
                var $target = $(event.target),
                    $element = $(element[0]);

                if (!$target.is($element) && !$target.closest($element).length) {
                    ctrl.isOpened = false;
                    scope.$digest();
                }
            }

            //TODO make keydown stylization
            function onDocumentKeyDown(e) {

                if (ctrl.isOpened) {

                    e.preventDefault();

                    //TODO make proper button actions
                    switch (e.which) {
                        case 38: /* UP key */
                            if ($newActive.length) {
                                $active.removeClass(classes.activeClass);
                                $newActive.addClass(classes.activeClass);
                            }
                            break;

                        case 40: /* DOWN key */
                            if ($newActive.length) {
                                $active.removeClass(classes.activeClass);
                                $newActive.addClass(classes.activeClass);
                            }
                            break;

                        case 27: /* ESC key */
                            closeShowedList();
                            break;

                        case 36: /* HOME */
                        case 33: /* PGUP */
                            $active.removeClass(classes.activeClass);
                            $items.first().addClass(classes.activeClass);
                            break;

                        case 35: /* END */
                        case 34: /* PGDOWN */
                            $active.removeClass(classes.activeClass);
                            $items.last().addClass(classes.activeClass);
                            break;
                    }
                }
            }

        },

        templateUrl: 'simple/simple-select.tmpl.html'

    }
});
