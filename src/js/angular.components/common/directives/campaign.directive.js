'use strict';

(function () {

  angular.module('actApp')
    .directive('amCampaign', ['FormatUrl', function (FormatUrl) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          parameters: '=',
          full: '=',
          callback: '&onCallback'
        },
        templateUrl: FormatUrl.getDirectivePath('common') + 'campaign.directive.html',
        link: function (scope, elem, attrs) {

          scope.campaign = {
            bodyCollapsed: true,
            parameters: scope.parameters,
            full: scope.full,
            // Function collapsible content
            collapsibleToggle: function () {
              scope.campaign.bodyCollapsed = !scope.campaign.bodyCollapsed;
            }
          };

        }
      };
    }]);
})();