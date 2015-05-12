'use strict';

(function () {

  var actApp = angular.module('actApp', [
    'ui.router'
  ]);


  angular.module('actApp')
    .config(['$stateProvider', '$urlRouterProvider', 'FormatUrlProvider',
      function ($stateProvider, $urlRouterProvider, FormatUrlProvider) {
        $urlRouterProvider.otherwise('/main');

        $stateProvider

          .state('main', {
            abstract: true,
            templateUrl: FormatUrlProvider.getTemplatePath('main') + 'main.html',
            controller: 'MainController'
          })
            .state('main.dashboard', {
              url: '/dashboard',
              templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'list.html',
              controller: 'DashboardController'
            })
            .state('main.campaign', {
              abstract: true,
              templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.html',
              controller: 'CampaignController'
            })
          .state('main.campaign.detail', {
            url: '/campaign/:campaignId',
            views: {
              'viewPageContainerLeft': {
                templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.sidebarLeft.html'
              },
              'viewPageContainerRight': {
                templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.sidebarRight.html'
              },
              'viewPageContainerCenter': {
                templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.center.html'
              }
            }
          })
        ;

      }])

    .run([function () {

    }]);

})();