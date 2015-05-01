(function () {
  'use strict';

  actApp
    .controller('DashboardController', ['$scope', function ($scope) {
      $scope.dashboard = {
        sources: [{
          status: 'status-ok',
          json: [
            {
              standby: 200,
              progress: 20,
              ok: 30,
              ko: 10
            }
          ]
        },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          },
          {
            status: 'status-ok',
            json: [
              {
                standby: 0.1,
                progress: 0.5,
                ok: 0.15,
                ko: 0.25
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          },{
            status: 'status-ok',
            json: [
              {
                standby: 200,
                progress: 20,
                ok: 30,
                ko: 10
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          },
          {
            status: 'status-ok',
            json: [
              {
                standby: 0.1,
                progress: 0.5,
                ok: 0.15,
                ko: 0.25
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          }]
      };
    }]);
})();