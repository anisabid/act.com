'use strict';

var Obj = {
  color: {
    standby: "#333333",
    progress: '#f7ca18',
    ok: "#2bb38a",
    ko: "#e34b51"
  }
};

(function () {

  angular.module('actApp')
    .constant('ActPaths', {

      baseUrl: './assets/dist/',
      templates: {
        main: 'tpl/main/templates/',
        dashboard: 'tpl/common/templates/',
        campaign: 'tpl/campaign/templates/'
      },
      directives: {
        common: 'tpl/common/directives/'
      }

    });

})();
