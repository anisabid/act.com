(function () {
  'use strict';

  actApp.directive('amIndicator', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        parameters: '='
      },
      templateUrl: '../src/js/angular.components/commun/directives/indicator.directive.html',
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