(function ($) {
  'use strict';

  actApp.directive('amCampaign', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        index: '@',
        parameters: '='
      },
      templateUrl: '../src/js/angular.components/commun/directives/campaign.directive.html',
      link: function (scope, elem, attrs) {

        scope.campaign = {
          id: 'circle-' + scope.index + '-' + scope.$id,
          parameters: scope.parameters
        };

        $timeout(function(){
          $('#' + scope.campaign.id).d3jsCircle();
        });

      }
    };
  }]);
})(jQuery);