'use strict';

/**
 * @ngdoc overview
 * @name watchLiveApp
 * @description
 * # watchLiveApp
 *
 * Main module of the application.
 */
window.app = angular.module('watchLiveApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'ngSanitize'
  ]);
  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/home.html',
          data: {
              pageTitle: 'Watch Live',
              theme: 'cyan'
          },
          controller: function($rootScope, $state){
            $rootScope.pageTitle = $state.current.data.pageTitle;
            $rootScope.theme = $state.current.data.theme;
          }
        })
        .state('test', {
          url: '/test',
          templateUrl: 'views/test.html',
          data: {
              pageTitle: 'Test Sayfasi',
              theme: 'indigo'
          },
          controller: function($rootScope, $state){
            $rootScope.pageTitle = $state.current.data.pageTitle;
            $rootScope.theme = $state.current.data.theme;
          }
        })
        .state('live', {
          url: '/live',
          templateUrl: 'views/live.html',
          controller: 'LiveCtrl',
          data: {
              pageTitle: 'All Sports',
              theme: 'green'
          }
        })
        .state('live.details', {
          url: '/id/:id',
          templateUrl: 'views/live.details.html',
          controller: 'LivedetailsCtrl',
          data: {
              pageTitle: '',
              class: 'live-details',
              theme: 'red'
          }
        });
    }
  ]);
  app.directive('menuLink', function() {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'views/menu-link.tmpl.html'
    };
  });
  app.config(function($mdThemingProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50'],
      '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue', {
        'default': '700',
        'hue-1': '500'
      })
      .accentPalette('grey', {
        'default': '300',
        'hue-1': '100'
      });
    $mdThemingProvider.theme('green')
      .primaryPalette('green', {
        'default': '700',
        'hue-1': '500'
      })
      .accentPalette('grey', {
        'default': '300',
        'hue-1': '100'
      });
    $mdThemingProvider.theme('red')
      .primaryPalette('red', {
        'default': '700',
        'hue-1': '500'
      })
      .accentPalette('grey', {
        'default': '300',
        'hue-1': '100'
      });
    $mdThemingProvider.theme('indigo')
        .primaryPalette('indigo', {
          'default': '700',
          'hue-1': '500'
        })
        .accentPalette('grey', {
          'default': '300',
          'hue-1': '100'
        });
    $mdThemingProvider.theme('cyan')
            .primaryPalette('cyan', {
              'default': '500',
              'hue-1': '300'
            })
            .accentPalette('grey', {
              'default': '300',
              'hue-1': '100'
            });

  });
  app.filter('humanizeDoc', function() {
    return function(doc) {
      if (!doc) {
        return;
      }
      if (doc.type === 'directive') {
        return doc.name.replace(/([A-Z])/g, function($1) {
          return '-'+$1.toLowerCase();
        });
      }
      return doc.label || doc.name;
    };
  });

  app.filter('homeTeam', function() {
    return function(str){
        str = str.substr(0, str.indexOf('-')).toLowerCase();
        str = str.length > 14 ? str.substr(0,14) + '..' : str;
        return str;
      };
  });

  app.filter('awayTeam',  function() {
    return function(str){
      str = str.substr(str.indexOf('-') + 1, str.length - str.indexOf('-') - 1).toLowerCase();
      str = str.length > 30 ? str.substr(0,30) + '..' : str;
      return str;
    };
  });

  app.filter('sportName',  function() {
    return function(str){
      if (str) {
        str = str.replace(/\s+/g, '').toLowerCase();
        return str;
      }
    };
  });

  app.filter('matchStatus', function() {
    return function(str){
      var transl = {
        'undefined':'Belirsiz','not_started':'Başlamadı','started':'Başladı', 'item1p':'1. Yarı', 'item2p':'2. Yarı', 'item3p':'3. Yarı', 'item4p':'4. Yarı', 'item5p':'5. Yarı', 'item1set':'1. Set', 'item2set':'2. Set', 'item3set':'3. Set', 'item4set':'4. Set', 'item5set':'5. Set', 'item6set':'6. Set', 'item7set':'7. Set', 'item1q':'1.Çeyrek', 'item2q':'2.Çeyrek', 'item3q':'3.Çeyrek', 'item4q':'4.Çeyrek', 'paused':'Devre Arası', 'pause1':'1. Mola', 'pause2':'2. Mola', 'pause3':'3. Mola', 'pause4':'4. Mola', 'pause5':'5. Mola', 'pause6':'6. Mola', 'ot':'Uzatmalar', 'awaiting_ot':'Bekleyen Uzatma', 'item1p_ot':'İlk periyot Uzatmalar', 'ot_ht':'1. Yarı Uzatma', 'item2p_ot':'2. yarı Uzatma', 'after_ot':'Uzatmalardan Sonra', 'awaiting_pen':'Beklenen Cezalar', 'pen':'Penaltı', 'after_pen':'Penaltılar Sonucu', 'ended':'Bitti', 'postponed':'Ertelenen', 'delayed':'Ertelendi', 'canceled':'İptal Edildi', 'cancelled':'İptal Edildi', 'interrupted':'Kapatılmalıdır', 'abondoned':'Terketti', 'walkover':'Kolay Kazanılan Başarı', 'walkover1':'1. Yarı Kolay Kazanma', 'walkover2':'2. Yarı Kolay Kazanma', 'retired':'Ayrıldı', 'retired1':'1. Yarı Ayrıldı', 'retired2':'2. Yarı Ayrıldı', 'item1it':'1. Atış(üst)', 'item1ib':'1. Atış(alt)', 'item2it':'2. Atış(üst)', 'item2ib':'2. Atış(alt)', 'item3it':'3. Atış(üst)', 'item3ib':'3. Atış(alt)', 'item4it':'4. Atış(üst)', 'item4ib':'4. Atış(alt)', 'item5it':'5. Atış(üst)', 'item5ib':'5. Atış(alt)', 'item6it':'6. Atış(üst)', 'item6ib':'6. Atış(alt)', 'item7it':'7. Atış(üst)', 'item7ib':'7. Atış(alt)', 'item8it':'8. Atış(üst)', 'item8ib':'8. Atış(alt)', 'item9it':'9. Atış(üst)', 'item9ib':'9. Atış(alt)', 'eit':'Extra Atış(üst)', 'eib':'Extra Atış(alt)', 'bt1b1':'1. Üst 1. Alt Arası', 'bt2b1':'2. Üst 1. Alt Arası', 'bt2b2':'2. Üst 2. Alt Arası', 'bt3b2':'3. Üst 2. Alt Arası', 'bt3b3':'3. Üst 3. Alt Arası', 'bt4b3':'4. Üst 3. Alt Arası', 'bt4b4':'4. Üst 4. Alt Arası', 'bt5b4':'5. Üst 4. Alt Arası', 'bt5b5':'5. Üst 5. Alt Arası', 'bt6b5':'6. Üst 5. Alt Arası', 'bt6b6':'6. Üst 6. Alt Arası', 'bt7b6':'7. Üst 6. Alt Arası', 'bt7b7':'7. Üst 7. Alt Arası', 'bt8b7':'8. Üst 7. Alt Arası', 'bt8b8':'8. Üst 8. Alt Arası', 'bt9b8':'9. Üst 8. Alt Arası', 'bt9b9':'9. Üst 9. Alt Arası', 'bteib9':'El Üst 9. Alt Arası', 'bteibet':'El Üst El Alt Arası', 'gset':'Altın Set', 'sd':'Ani ölüm', 'after_sd':'Ani Ölümden Sonra', 'in_progress':'Yükleniyor', 'session_break':'Oturum Sonu', 'defaulted1':'Hükmen Yenilmiş', 'defaulted2':'Hükmen Yenilmiş'
        };

      return str ? transl[str.toLowerCase()]||str : '';
    };
  });

  app.filter('countryCode', function() {
    function f(val){
      var COUNTRIES = [{ code:'af', name:'Afganistan'},{ code:'ax', name:'Aland Islands'},{ code:'al', name:'Albania'},{ code:'dz', name:'Cezayir'},{ code:'as', name:'American Samoa'},{ code:'ad', name:'Andorra'},{ code:'ao', name:'Angola'},{ code:'ai', name:'Anguilla'},{ code:'aq', name:'Antarctica'},{ code:'ag', name:'Antigua And Barbuda'},{ code:'ar', name:'Arjantin'},{ code:'am', name:'Ermenistan'},{ code:'aw', name:'Aruba'},{ code:'au', name:'Avustralya'},{ code:'at', name:'Avusturya'},{ code:'at', name:'Avusturya Amatör'},{ code:'az', name:'Azerbaycan'},{ code:'bs', name:'Bahamas'},{ code:'bh', name:'Bahrain'},{ code:'bd', name:'Bangladesh'},{ code:'bb', name:'Barbados'},{ code:'by', name:'Belarus'},{ code:'be', name:'Belçika'},{ code:'bz', name:'Belize'},{ code:'bj', name:'Benin'},{ code:'bm', name:'Bermuda'},{ code:'bt', name:'Bhutan'},{ code:'bo', name:'Bolivya'},{ code:'ba', name:'Bosna Hersek'},{ code:'bw', name:'Botswana'},{ code:'bv', name:'Bouvet Island'},{ code:'br', name:'Brezilya'},{ code:'io', name:'British Indian Ocean Territory'},{ code:'bn', name:'Brunei Darussalam'},{ code:'bg', name:'Bulgaristan'},{ code:'bf', name:'Burkina Faso'},{ code:'bi', name:'Burundi'},{ code:'kh', name:'Cambodia'},{ code:'cm', name:'Cameroon'},{ code:'ca', name:'Kanada'},{ code:'cv', name:'Cape Verde'},{ code:'ky', name:'Cayman Islands'},{ code:'cf', name:'Central African Republic'},{ code:'td', name:'Çad'},{ code:'cl', name:'Şili'},{ code:'cn', name:'Çin'},{ code:'cx', name:'Christmas Island'},{ code:'cc', name:'Cocos (Keeling) Islands'},{ code:'co', name:'Kolombiya'},{ code:'km', name:'Comoros'},{ code:'cg', name:'Congo'},{ code:'cd', name:'Congo Democratic Republic'},{ code:'ck', name:'Cook Islands'},{ code:'cr', name:'Kosta Rika'},{ code:'ci', name:'Fildişi Sahili'},{ code:'hr', name:'Hırvatistan'},{ code:'cu', name:'Küba'},{ code:'cy', name:'Kıbrıs Rum Kesimi'},{ code:'cz', name:'Çek Cumhuriyeti'},{ code:'dk', name:'Danimarka'},{ code:'dk', name:'Danimarka Amatör'},{ code:'dj', name:'Djibouti'},{ code:'dm', name:'Dominica'},{ code:'do', name:'Dominican Republic'},{ code:'ec', name:'Ekvador'},{ code:'eg', name:'Mısır'},{ code:'eu', name:'Avrupa'},{ code:'sv', name:'El Salvador'},{ code:'gq', name:'Equatorial Guinea'},{ code:'er', name:'Eritrea'},{ code:'ee', name:'Estonya'},{ code:'et', name:'Ethiopia'},{ code:'fk', name:'Falkland Islands (Malvinas)'},{ code:'fo', name:'Faroe Adaları'},{ code:'fj', name:'Fiji'},{ code:'fi', name:'Finlandiya'},{ code:'fr', name:'Fransa'},{ code:'gf', name:'French Guiana'},{ code:'pf', name:'French Polynesia'},{ code:'tf', name:'French Southern Territories'},{ code:'ga', name:'Gabon'},{ code:'gm', name:'Gambia'},{ code:'ge', name:'Gürcistan'},{ code:'de', name:'Almanya'},{ code:'de', name:'Almanya Amatör'},{ code:'gh', name:'Gana'},{ code:'gi', name:'Cebelitarık'},{ code:'gr', name:'Yunanistan'},{ code:'gl', name:'Greenland'},{ code:'gd', name:'Grenada'},{ code:'gp', name:'Guadeloupe'},{ code:'gu', name:'Guam'},{ code:'gt', name:'Guatemala'},{ code:'gg', name:'Guernsey'},{ code:'gn', name:'Guinea'},{ code:'gw', name:'Guinea-Bissau'},{ code:'gy', name:'Guyana'},{ code:'ht', name:'Haiti'},{ code:'hm', name:'Heard Island & Mcdonald Islands'},{ code:'va', name:'Holy See (Vatican City State)'},{ code:'hn', name:'Honduras'},{ code:'hk', name:'Hong Kong'},{ code:'hu', name:'Macaristan'},{ code:'is', name:'İzlanda'},{ code:'in', name:'Hindistan'},{ code:'id', name:'Endonezya'},{ code:'ir', name:'Iran'},{ code:'iq', name:'Irak'},{ code:'ie', name:'İrlanda'},{ code:'ie', name:'Kuzey İrlanda'}, { code:'im', name:'Isle Of Man'},{ code:'il', name:'İsrail'},{ code:'it', name:'İtalya'},{ code:'jm', name:'Jameima'},{ code:'jp', name:'Japonya'},{ code:'je', name:'Jersey'},{ code:'jo', name:'Ürdün'},{ code:'kz', name:'Kazakistan'},{ code:'ke', name:'Kenya'},{ code:'ki', name:'Kiribati'},{ code:'kr', name:'Güney Kore'},{ code:'kr', name:'Kuzey Kore'},{ code:'kw', name:'Kuveyt'},{ code:'kg', name:'Kırgızistan'},{ code:'la', name:'Lao People\'s Democratic Republic'},{ code:'lv', name:'Letonya'},{ code:'lb', name:'Lübnan'},{ code:'ls', name:'Lesotho'},{ code:'lr', name:'Liberia'},{ code:'ly', name:'Libyan Arab Jamahiriya'},{ code:'li', name:'Liechtenstein'},{ code:'lt', name:'Litvanya'},{ code:'lu', name:'Luxembourg'},{ code:'mo', name:'Macao'},{ code:'mk', name:'Macedonia'},{ code:'mg', name:'Madagascar'},{ code:'mw', name:'Malawi'},{ code:'my', name:'Malaysia'},{ code:'mv', name:'Maldives'},{ code:'ml', name:'Mali'},{ code:'mt', name:'Malta'},{ code:'mh', name:'Marshall Islands'},{ code:'mq', name:'Martinique'},{ code:'mr', name:'Mauritania'},{ code:'mu', name:'Mauritius'},{ code:'yt', name:'Mayotte'},{ code:'mx', name:'Meksika'},{ code:'fm', name:'Micronesia Federated States Of'},{ code:'md', name:'Moldovya'},{ code:'mc', name:'Monaco'},{ code:'mn', name:'Mongolia'},{ code:'me', name:'Karadağ'},{ code:'ms', name:'Montserrat'},{ code:'ma', name:'Fas'},{ code:'mz', name:'Mozambik'},{ code:'mm', name:'Myanmar'},{ code:'na', name:'Namibia'},{ code:'nr', name:'Nauru'},{ code:'np', name:'Nepal'},{ code:'nl', name:'Hollanda'},{ code:'an', name:'Netherlands Antilles'},{ code:'nc', name:'New Caledonia'},{ code:'nz', name:'Yeni Zelanda'},{ code:'ni', name:'Nicaragua'},{ code:'ne', name:'Nijer'},{ code:'ng', name:'Nijerya'},{ code:'nu', name:'Niue'},{ code:'nf', name:'Norfolk Island'},{ code:'mp', name:'Northern Mariana Islands'},{ code:'no', name:'Norveç'},{ code:'om', name:'Oman'},{ code:'pk', name:'Pakistan'},{ code:'pw', name:'Palau'},{ code:'ps', name:'Palestinian Territory, Occupied'},{ code:'pa', name:'Panama'},{ code:'pg', name:'Papua New Guinea'},{ code:'py', name:'Paraguay'},{ code:'pe', name:'Peru'},{ code:'ph', name:'Filipinler'},{ code:'pn', name:'Pitcairn'},{ code:'pl', name:'Polonya'},{ code:'pt', name:'Portekiz'},{ code:'pr', name:'Puerto Rico'},{ code:'qa', name:'Katar'},{ code:'re', name:'Reunion'},{ code:'ro', name:'Romanya'},{ code:'ru', name:'Rusya Federasyonu'},{ code:'ru', name:'Rusya'},{ code:'ru', name:'Beyaz Rusya'},{ code:'rw', name:'Rwanda'},{ code:'bl', name:'Saint Barthelemy'},{ code:'sh', name:'Saint Helena'},{ code:'kn', name:'Saint Kitts And Nevis'},{ code:'lc', name:'Saint Lucia'},{ code:'mf', name:'Saint Martin'},{ code:'pm', name:'Saint Pierre And Miquelon'},{ code:'vc', name:'Saint Vincent And Grenadines'},{ code:'ws', name:'Samoa'},{ code:'sm', name:'San Marino'},{ code:'st', name:'Sao Tome And Principe'},{ code:'sa', name:'Suudi Arabistan'},{ code:'fi', name:'İskoçya'},{ code:'sn', name:'Senegal'},{ code:'rs', name:'Sırbistan'},{ code:'sc', name:'Seychelles'},{ code:'sl', name:'Sierra Leone'},{ code:'sg', name:'Singapur'},{ code:'sk', name:'Slovakya'},{ code:'si', name:'Slovenya'},{ code:'sb', name:'Solomon Islands'},{ code:'so', name:'Somalia'},{ code:'za', name:'Güney Afrika'},{ code:'gs', name:'South Georgia And Sandwich Isl.'},{ code:'es', name:'İspanya'},{code:'es', name:'Spain Amateur'},{ code:'lk', name:'Sri Lanka'},{ code:'sd', name:'Sudan'},{ code:'sr', name:'Suriname'},{ code:'sj', name:'Svalbard And Jan Mayen'},{ code:'sz', name:'Swaziland'},{ code:'se', name:'İsveç'},{ code:'se', name:'İsveç Amatör'},{ code:'ch', name:'İsviçre'},{ code:'sy', name:'Suriye'},{ code:'tw', name:'Tayland'},{ code:'tj', name:'Tacikistan'},{ code:'tz', name:'Tanzania'},{ code:'th', name:'Thailand'},{ code:'tl', name:'Timor-Leste'},{ code:'tg', name:'Togo'},{ code:'tk', name:'Tokelau'},{ code:'to', name:'Tonga'},{ code:'tt', name:'Trinidad And Tobago'},{ code:'tn', name:'Tunus'},{ code:'tn', name:'Tunesia'},{ code:'tr', name:'Türkiye'},{ code:'tr', name:'Türkiye Amatör'},{ code:'tm', name:'Turkmenistan'},{ code:'tc', name:'Turks And Caicos Islands'},{ code:'tv', name:'Tuvalu'},{ code:'ug', name:'Uganda'},{ code:'ua', name:'Ukrayna'},{ code:'ae', name:'BAE'},{ code:'gb', name:'İngiltere'},{ code:'gb', name:'İngiltere Amatör'},{ code:'us', name:'ABD'},{ code:'us', name:'Kuzey Amerika'},{ code:'wales', name:'Galler'},{ code:'um', name:'United States Outlying Islands'},{ code:'uy', name:'Uruguay'},{ code:'uz', name:'Uzbekistan'},{ code:'vu', name:'Vanuatu'},{ code:'ve', name:'Venezuela'},{ code:'vn', name:'Vietnam'},{ code:'vg', name:'Virgin Islands - British'},{ code:'vi', name:'Virgin Islands - U.S.'},{ code:'wf', name:'Wallis And Futuna'},{ code:'eh', name:'Western Sahara'},{ code:'ye', name:'Yemen'},{ code:'zm', name:'Zambia'},{ code:'zw', name:'Zimbabwe'},{ code:'ww', name:'Dünya'},{ code:'ww', name:'Uluslararası Kulüpler'},{ code:'ww', name:'Uluslararası'},{ code:'ww', name:'Uluslararası Genç'}];

        for(var i = 0; i < COUNTRIES.length; i++){
            if(COUNTRIES[i].name===val){
                return COUNTRIES[i];
            }
        }
        return null;
    }
    return function(str){
      if (str){


        var ret = f(str);
        if(ret){
            str = escape(ret.code);
        }
        if (str === 'ww') {
          return '<img src="images/world.png" class="world-icon">';
        } else {
            return '<i class="flag-icon flag-icon-' + str + '"></i>';
        }

      }
    };
  });
