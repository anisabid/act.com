'use strict';

(function () {

  function status (ActStatusConfig, type, imput) {
    switch (type) {
      case 'color':
        return ActStatusConfig.color[imput];
        break;
      default:
        // do something
        return ActStatusConfig.status[imput];
    }
  }

  angular.module('actApp')
    .filter('statusToColor', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'color', input);
      };
    }]);

  angular.module('actApp')
    .filter('statusToText', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'text', input);
      };
    }]);

  angular.module('actApp')
    .filter('statusToClass', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'class', input);
      };
    }]);

})();