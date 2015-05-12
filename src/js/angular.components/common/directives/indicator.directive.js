'use strict';

(function () {

  angular.module('actApp')
    .directive('amIndicator', ['FormatUrl', function (FormatUrl) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          parameters: '='
        },
        templateUrl: FormatUrl.getDirectivePath('common') + 'indicator.directive.html',
        link: function (scope, elem, attrs) {

          scope.indicator = {
            parameters: scope.parameters,
            title: attrs.title,
            class: attrs.class,
            show: eval(attrs.show)
          };

        }
      };
    }]);
})();