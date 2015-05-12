'use strict';

(function () {

  angular.module('actApp')
    .provider('FormatUrl', ['ActPaths', function (ActPaths) {

      this.getBaseUrl = function () {
        return ActPaths.baseUrl;
      };

      this.getTemplatePath = function (stringUrl) {
        return this.getBaseUrl() + ActPaths.templates[stringUrl];
      };

      this.getDirectivePath = function (stringUrl) {
        return this.getBaseUrl() + ActPaths.directives[stringUrl];
      };

      this.$get = function () {

        return this;

      };
    }]);

})();