'use strict';

describe('Controller: LivedetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('watchLiveApp'));

  var LivedetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LivedetailsCtrl = $controller('LivedetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LivedetailsCtrl.awesomeThings.length).toBe(3);
  });
});
