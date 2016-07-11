angular.module('app').controller('SimpleDialogController', function SimpleDialogController(dialogWrapFactory) {

    var self = this;

    self.onSubmit = function() {
        dialogWrapFactory.close();
    };

});