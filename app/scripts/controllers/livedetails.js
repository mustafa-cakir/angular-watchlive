'use strict';

/**
 * @ngdoc function
 * @name watchLiveApp.controller:LivedetailsCtrl
 * @description
 * # LivedetailsCtrl
 * Controller of the watchLiveApp
 */

app.controller('LivedetailsCtrl', LivedetailsCtrl);

LivedetailsCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$http', '$sce'];

function LivedetailsCtrl($scope, $rootScope, $state, $stateParams, $http, $sce) {
  $scope.loading = true;
  $rootScope.isDetails = true;
  $rootScope.pageTitle = $state.current.data.pageTitle;
  $rootScope.theme = $state.current.data.theme;
  function successCallback(response) {
    $scope.matchDetails = response.data.ret;

    $scope.printStream = function(data) {
      if (data){
        var response;
        if (data.patch.StreamingId) {
          var flasvars = 'autoplay=1&id='+ data.patch._id +'&token='+ data.patch.StreamingId+'|'+ data.siteName+'|'+ data.sessionID+'&skin=images/mySkin.swf';
          response = '<embed type="application/x-shockwave-flash" src="images/player.swf?v1.3.5" width="100%" id="f" name="f" height="400" flashvars="'+flasvars+'" allowScriptAccess="always" allowfullscreen="true" bgcolor="#000000"/><noembed>You need Adobe Flash Player to watch this video. <br><a href="http://get.adobe.com/flashplayer/">Download it from Adobe.</a><a href="http://gokercebeci.com/dev/f4player" title="flv player">flv player</a></noembed><br><Br>';
        }
        response = response + '<md-toolbar><div class="md-toolbar-tools"><h1 class="md-flex">Live Stats</h1></div></md-toolbar><iframe id="frmBetRadar" src="https://href.li/?https://cs.sportradar.com/ls/widgets/?/matchpoint/tr/page/widgets_lmts#matchId='+data.patch.BetRadarId+'" style=" height:100%;width:100%;min-height: 379px;" frameborder="no" scrolling="no"></iframe>';
        return $sce.trustAsHtml(response);
      }
    };
    $scope.loading = false;
  }
  function errorCallback(err) {
    console.log('error: ' + err);
  }
  $http.get('URL_GOES_HERE/api/getLiveMatch/' + $stateParams.id).then(successCallback, errorCallback);

  $rootScope.goBack = function() {
    history.back();
    $rootScope.isDetails = false;
  };

  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}
