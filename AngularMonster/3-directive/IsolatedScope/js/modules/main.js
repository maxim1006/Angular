var app = angular.module('app', []);

app.controller("MainController", function($scope) {
    $scope.name = "Max";
    $scope.color = "red";
    $scope.styles = {
        'color': $scope.color
    };
    $scope.reverse = function() {
        $scope.name = $scope.name.split('').reverse().join('');
    };
});


app.directive("custom", function($timeout) {
    return {
        scope: { //это полностью изолированный скоуп, он не наследует свойства и методы контроллера, но общаться с контроллером всеже можно:
            name: "@" //забрать свойство из контроллера, но только в режиме ридонли, плюс надо сделать аттрибут <custom name="{{name}}"></custom>
            ,styles: "=" //myStyle - не работает для двустороннего биндинга, надо слово в одну строку + атрибут styles="styles"
            ,color: "=" //а это двухсторонний биндинг между переменной в контроллере и в директиве
            ,reverse: "&" //значит выполнить выражение из родительского контроллера, использую, когда хочу вызвать какую-нибудь функцию + атрибут reverse="reverse()
        },
        template: "" +

        "<div>Name из директивы {{name}} <input type='text' ng-model='name'></div>" +


        "<div>Color из директивы {{color}} <input type='text' ng-model='color'></div>" +

        "<div><span style='color: {{styles.color}}'>Color</span> из директивы {{styles.color}} <input type='text'  ng-model='styles.color'></div>" +

        "<button ng-click='reverse()'>Reverse</button>",


        link: function($scope, element, attrs) {
            //$timeout(function() {
                element.find('input').eq(0)[0].focus();
            //}, 0);console.log($scope);


        }
    };
});