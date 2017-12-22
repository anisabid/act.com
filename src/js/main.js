'use strict';

(function () {

  var actApp = angular.module('actApp', [
    'ui.router',
    'ui.tree',
    'ngScrollbars',
    '720kb.tooltips'
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
            controller: 'DashboardController',
            resolve: {
              CampaignListData: ['CampaignFactory',
                function (CampaignFactory) {
                  return CampaignFactory.getCampaignList();
                }],
              ApplicationListData: ['ApplicationFactory',
                function (ApplicationFactory) {
                  return ApplicationFactory.getApplicationList();
                }]
            }
          })
          .state('main.campaign', {
            abstract: true,
            templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.html',
            controller: 'CampaignController',
            resolve: {
              CampaignListData: ['CampaignFactory',
                function (CampaignFactory) {
                  return CampaignFactory.getCampaignList();
                }],
              TestListData: ['TestFactory',
                function (TestFactory) {
                  return TestFactory.getTestList();
                }],
              CampaignDetailData: ['CampaignFactory',
                function (CampaignFactory) {
                  return CampaignFactory.getCampaignDetail();
                }
              ]
            }
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
          });

      }])

    .run([function () {

    }]);

})();