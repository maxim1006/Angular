var app = angular.module('app', []);

//nested controllers - с помощью них получаю доступ к методами и свойствам родительского контроллера
//$scope.mainController = this - это тоже самое что и as в контроллере

app.controller('myName', function() {
    var self = this;

    this.showWife = false;
    this.showBrother = false;

    this.showName = function(name) {
        if (name === "Aliya") {
            self.showWife = true;
            self.wifeName = "Aliya";
        }  else if (name === "Anton") {
            self.showBrother = true;
            self.brotherName = "Anton";
        }
    };
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
