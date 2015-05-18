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

  angular.module('actApp')
    .constant('ActScrollbarConfig', {

      autoHideScrollbar: true,
      theme: 'light',
      advanced: {
        updateOnContentResize: true
      }

    });

  angular.module('actApp')
    .constant('ActRest', {

      baseUrl: 'http://localhost:8888/jsonmock/',
      campaign: {
        list: {
          method: 'GET',
          url: 'campaigns.mock.json'
        },
        detail: {
          method: 'GET',
          url: 'campaign.tree.mock.json'
        }
      },
      application: {
        list: {
          method: 'GET',
          url: 'applications.mock.json'
        }
      },
      test: {
        list: {
          method: 'GET',
          url: 'tests.mock.json'

        }
      }

    });

})();
