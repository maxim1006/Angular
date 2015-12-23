angular.module("app", [])
    .controller("mainCtrl", ['$scope', function($scope) {
        var _this = this;

        this.data = [
            {
                name: "Max",
                age: 28,
                occupation: "front-end developer"
            },
            {
                name: "Aliya",
                age: 29,
                occupation: "bank worker"
            },
            {
                name: "Anton",
                age: 30,
                occupation: "RZD"
            }
        ];

        this.value = 'name';
        this.reverse = true;
        this.arrowClass = 'arrow_up';

        this.sortBy = function(value) {
            _this.reverse = (_this.value === value) ? !_this.reverse : false;
            _this.value = value;
            _this.arrowClass = _this.reverse ?  'arrow_up' : 'arrow_down';
        };


    }]);