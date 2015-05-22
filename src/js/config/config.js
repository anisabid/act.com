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
    .constant('ActStatusConfig', {

      status: ['standby', 'progress', 'ok', 'ko'],
      color: ['#333333', '#f7ca18', '#2bb38a', '#e34b51']

    });

  angular.module('actApp')
    .constant('ActRest', {

      baseUrl: 'http://localhost:3000/', //'http://localhost:8888/jsonmock/',
      campaign: {
        list: {
          method: 'GET',
          url: 'campaign' //'campaigns.mock.json'
        },
        detail: {
          method: 'GET',
          url: 'campaignTree' //'campaign.tree.mock.json'
        }
      },
      application: {
        list: {
          method: 'GET',
          url: 'application' //'applications.mock.json'
        }
      },
      test: {
        list: {
          method: 'GET',
          url: 'test' //'tests.mock.json'
        }
      }

    });

})();
