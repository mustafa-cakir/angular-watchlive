'use strict';

/**
 * @ngdoc function
 * @name watchLiveApp.controller:testCtrl
 * @description
 * # testCtrl
 * Controller of the watchLiveApp
 */

app.controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$state','$mdBottomSheet', '$mdSidenav', '$mdDialog', '$timeout'];

function AppCtrl($scope, $state, $mdBottomSheet, $mdSidenav, $mdDialog,$timeout) {
  function closeMenu() {
    $timeout(function() { $mdSidenav('left').close(); });
  }

  $scope.$on('$locationChangeSuccess', function() {
    $scope.closeMenu();
  });
  $scope.closeMenu = closeMenu;

  $scope.toggleSearch = function() {
    $scope.showSearch = !$scope.showSearch;
  };
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon aria-label="{{item.name}}">item.iconBuraya</md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };


  // $scope.theme = $stateParams.theme;
  // $scope.pageTitle = $stateParams.pageTitle;
  // console.log($stateParams);
  // if ($stateParams.obj) {
  //   console.log($stateParams.obj);
  // }


  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  $scope.showAdd = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container> </div> <md-input-container flex> <label>Message</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
        targetEvent: ev,
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
  };

  $scope.$on('$viewContentLoaded', function(){
    //angular.element(document).find('.loading');
    $scope.hideLoading = true;
  });

}



angular.module('watchLiveApp').controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [{
        name: 'Share',
        icon: 'share'
      },
      {
        name: 'Upload',
        icon: 'upload'
      },
      {
        name: 'Copy',
        icon: 'copy'
      },
      {
        name: 'Print this page',
        icon: 'print'
      },
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  });

angular.module('watchLiveApp').controller('DemoCtrl', function() {
    var self = this;
    // list of `state` value/display objects
    self.selectedItem = null;
    self.searchText = null;
    self.states = function loadAll() {
      var allStates = 'Ali Conners, Alex, Scott, Jennifer,Sandra Adams, Brian Holt,Trevor Hansen';
      return allStates.split(/, +/g).map(function(state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    };
    self.querySearch = function querySearch(query) {
      var results = query ? self.states.filter(createFilterFor(query)) : [];
      return results;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  });
