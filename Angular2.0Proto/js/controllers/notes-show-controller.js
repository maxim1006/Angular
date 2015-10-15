angular.module('NoteWrangler')
.controller('NotesShowController', function($http, $routeParams) {
    //console.log($routeParams); //Object {id: "1"}

    var self = this;

    $http({method: 'GET', url: './js/model/notes/' + $routeParams.id + '.json'}).success(function(data) {
        self.note = data;
        console.log(data);
    })
});