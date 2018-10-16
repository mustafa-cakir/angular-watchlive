'use strict';

/**
 * @ngdoc function
 * @name watchLiveApp.controller:LeftSideNavCtrl
 * @description
 * # LeftSideNavCtrl
 * Controller of the watchLiveApp
 */

app.controller('LeftSideNavCtrl', LeftSideNavCtrl);

LeftSideNavCtrl.$inject = ['$scope'];

function LeftSideNavCtrl($scope) {
  $scope.menu = [{
      name: 'Homepage',
      url: '#!/',
      type: 'link',
      icon: 'star',
    },
    {
      name: 'Test',
      url: '#!/test',
      type: 'link',
      icon: 'account_box',
    },
    {
      name: 'Watch Live',
      url: '#!/live',
      type: 'link',
      icon: 'play_circle_fill',
    }
  ];
  // push starts

  /* $scope.menu.push({
    name: 'Customization',
    type: 'heading',
    icon: 'chevron_right',
    children: [{
        name: 'CSS',
        type: 'toggle',
        pages: [{
            name: 'Typography',
            url: 'CSS/typography',
            type: 'link'
          },
          {
            name: 'Button',
            url: 'CSS/button',
            type: 'link'
          },
          {
            name: 'Checkbox',
            url: 'CSS/checkbox',
            type: 'link'
          }
        ]
      },
      {
        name: 'Theming',
        type: 'toggle',
        pages: [{
            name: 'Introduction and Terms',
            url: 'Theming/01_introduction',
            type: 'link'
          },
          {
            name: 'Declarative Syntax',
            url: 'Theming/02_declarative_syntax',
            type: 'link'
          },
          {
            name: 'Configuring a Theme',
            url: 'Theming/03_configuring_a_theme',
            type: 'link'
          },
          {
            name: 'Multiple Themes',
            url: 'Theming/04_multiple_themes',
            type: 'link'
          },
          {
            name: 'Under the Hood',
            url: 'Theming/05_under_the_hood',
            type: 'link'
          },
          {
            name: 'Browser Color',
            url: 'Theming/06_browser_color',
            type: 'link'
          }
        ]
      }
    ]
  });
  */  // push ends
}
