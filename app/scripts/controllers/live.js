'use strict';

/**
 * @ngdoc function
 * @name watchLiveApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the watchLiveApp
 */

app.controller('LiveCtrl', LiveCtrl);

LiveCtrl.$inject = ['$scope', '$rootScope', '$state','$http'];

function LiveCtrl($scope, $rootScope, $state, $http) {
  $rootScope.pageTitle = $state.current.data.pageTitle;
  $rootScope.theme = $state.current.data.theme;
  $rootScope.isDetails = false;
  $scope.loading = true;
  function successCallback(response) {
    var data = response.data.ret.Sports;
    $scope.liveSports = data;
    $scope.loading = false;
    //$scope.liveMatches = response.data.ret.Match;
  }
  function errorCallback(err) {
    console.log('error: ' + err);
  }
  //$http.get('/scripts/getLiveSports.json').then(successCallback, errorCallback);
  $http.get('URL_GOES_HERE/api/getLiveSports').then(successCallback, errorCallback);
  $scope.checkMinutes = function(min) {
    return (min === '0"') ? '' : min;
  };

  $scope.sortByCountry = function(data) {
      var topCountries = [
        'Türkiye',
        'İngiltere',
        'İspanya',
        'İtalya',
        'Fransa',
        'Hollanda',
        'Portekiz',
        'Belçika',
        ''
      ].reverse();
        if(topCountries.indexOf(data.Country) > 0){
          return  -topCountries.indexOf(data.Country);
        }else {
          return data.Country;
        }

  };

  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}
