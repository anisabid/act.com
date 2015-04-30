(function () {
  'use strict';

  actApp.directive('amCampaign', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        parameters: '='
      },
      templateUrl: '../src/js/angular.components/commun/directives/campaign.directive.html',
      link: function (scope, elem, attrs) {

        scope.campaign = {
          parameters: scope.parameters
        };

      }
    };
  }]);
})();