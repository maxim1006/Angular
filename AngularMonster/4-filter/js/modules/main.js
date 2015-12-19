var app = angular.module('app', []);

app.controller("mainCtrl", function() {
    this.prices = ['1.22$', '$3.33', '4.44'];
});

app.filter("moneyFilter", function() {
    return function(val) {
        var lastChar = val.slice(-1);
        var firstChar = val.slice(0, 1);
        var slicedPart;

        if (lastChar === "$") {
            slicedPart = val.slice(0, val.length-1);
        } else if (firstChar === "$") {
            slicedPart = val.slice(1, val.length);
        } else {
            slicedPart = val;
        }

        return '$' + slicedPart;
    }
});