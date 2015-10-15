
angular.module('NoteWrangler')
    .controller('NotesIndexController', function($http) {
        var self = this;

        self.notes = [];

        $http({method: 'GET', url: './js/model/notes/notes.json'}).success(function(data) {
            self.notes = data;
        })
    });