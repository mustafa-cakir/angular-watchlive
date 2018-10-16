'use strict';

describe('Controller: LeftsidenavCtrl', function () {

    // load the controller's module
    beforeEach(module('watchLiveApp'));

    var LeftsidenavCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LeftsidenavCtrl = $controller('LeftsidenavCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(LeftsidenavCtrl.awesomeThings.length).toBe(3);
    });
});
