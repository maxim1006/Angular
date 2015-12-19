var app = angular.module('app', []);

//nested controllers - с помощью них получаю доступ к методами и свойствам родительского контроллера

app.controller('myName', function() {
    this.showName = function(name) {
        console.log(name);
        return "Max";
    };

    console.log(this);
});

app.controller('wifeName', function(myFactory) {
    this.myFactory = myFactory;
    this.name = "Aliya";
   /* .showName = function() {
        console.log("Aliya");
        return "Aliya";
    };*/
});

app.controller('brotherName', function(myFactory) {
    this.myFactory = myFactory;
    this.name = "Anton";
    //если тут не указыать метод а в родительском контроллере этот метод есть, то он будет отнаследован
    //.showName = function() {
    //    console.log("Anton");
    //    return "Anton";
    //};
    console.log(this);
});

app.factory('myFactory', function() {
   return {
       can: "yes"
   }
});
