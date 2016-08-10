angular.module('app').directive('materialWave', function materialWaveDirective($timeout) {

    var CLASSES = {
        ripple: 'material-wave',
        active: 'material-wave_active',
        circle: 'material-wave__circle',
        circleActive: 'material-wave__circle_active',
        circleAnimated: 'material-wave__circle_animated'
    };

    var options = {
        radiusFactor: 1.14,
        dyingTime: 300
    };


    return {
        scope: {},

        transclude: true,

        template: '<ng-transclude></ng-transclude>',

        element: 'A',

        link: function(scope, element, attr) {

            element
                .addClass(CLASSES.ripple)
                .on('mousedown touchstart', activateHandler)
                .on('mouseup mouseleave touchend', deactivateHandler);

        }
    };


    /**
     * Activate handler
     * @param {Object} e   event object
     */
    function activateHandler(e) {
        var $this = $(this),
            $circle = angular.element('<span class="' + CLASSES.circle + '"></span>'),
            dimensions = calcDimensions.call($this),
            radius = calcRadius.call($this, options.radiusFactor, dimensions.width, dimensions.height),
            position = calcPosition.call($this, e, dimensions.offset);

        $this.append($circle);

        $timeout( function() {
            setInitialCSS.call($circle, radius, position);
            setTransformationCSS.call($circle, {
                x: (dimensions.width  / 2 - position.left) / options.radiusFactor,
                y: (dimensions.height / 2 - position.top)  / options.radiusFactor
            });

            $this
                .addClass(CLASSES.active);

            $circle
                .addClass(CLASSES.circleActive)
                .addClass(CLASSES.circleAnimated);
        });
    }


    /**
     * Deactivate handler
     */
    function deactivateHandler() {
        var $this = $(this),
            $circles = $this.find('.' + CLASSES.circle);

        $this.removeClass(CLASSES.active);
        $circles.removeClass(CLASSES.circleActive);

        $timeout( function() {
            $circles.remove();
        }, options.dyingTime);

    }


    /**
     * Calc circle position
     * @param {Object} e   event object
     */
    function calcPosition(e) {
        var elementOffset = this.offset(),
            pointerOffset = {
                top: e.pageY,
                left: e.pageX
            };

        return {
            top: pointerOffset.top - elementOffset.top,
            left: pointerOffset.left - elementOffset.left
        };
    }


    /**
     * Calc circle radius according to button parameters
     * @param {Number} radiusFactor   circle radius factor
     */
    function calcRadius(radiusFactor) {
        var width = this.outerWidth(),
            height = this.outerHeight();

        return radiusFactor * Math.sqrt(width * width + height * height) / 2;
    }


    /**
     * Calc dimensions of the element
     */
    function calcDimensions() {
        var width  = this.outerWidth(),
            height = this.outerHeight(),
            offset = this.offset();

        return {
            width: width,
            height: height,
            offset: offset
        };
    }


    /**
     * Set initial CSS to circle
     * @param {Number} radius   circle radius
     * @param {Object} position   circle position
     */
    function setInitialCSS(radius, position) {
        this.css({
            width: radius * 2,
            height: radius * 2,
            margin: -radius,
            top: position.top,
            left: position.left
        });
    }


    /**
     * Set transformation to circle
     * @param {Object} offset
     */
    function setTransformationCSS(shift) {
        this.css({
            transform: 'translate3d(' + shift.x + 'px, ' + shift.y + 'px, 0) scale(1)'
        });
    }


});