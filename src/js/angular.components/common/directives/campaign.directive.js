'use strict';

(function () {

  angular.module('actApp')
    .directive('amCampaign', ['FormatUrl', function (FormatUrl) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          parameters: '='
        },
        templateUrl: FormatUrl.getDirectivePath('common') + 'campaign.directive.html',
        link: function (scope, elem, attrs) {

          scope.campaign = {
            bodyCollapsed: true,
            parameters: scope.parameters,
            // Function collapsible content
            collapsibleToggle: function () {
              scope.campaign.bodyCollapsed = !scope.campaign.bodyCollapsed;
            }
          };

        }
      };
    }]);
})();