(function() {

    /*Создаю модуль и записываю пути, таким образом, могу прописать контроллер для каждого пути*/
    angular.module('NoteWrangler', ['ngRoute']).config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/notes', {
            templateUrl: 'templates/pages/notes/index.html',
            controller: 'NotesIndexController',
            controllerAs: 'indexController'
        })

        .when('/notes/new', {
            templateUrl: 'templates/pages/notes/edit.html'
        })

        .when('/notes/:id', {
            templateUrl: 'templates/pages/notes/show.html',
            controller: 'NotesShowController',
            controllerAs: 'showController'
        })

        .when('/users', {
            templateUrl: 'templates/pages/users/index.html'
        })

        .when('/', {
                redirectTo: '/notes'
        })

        .otherwise({
            redirectTo: '/'
        });

    }]);

})();