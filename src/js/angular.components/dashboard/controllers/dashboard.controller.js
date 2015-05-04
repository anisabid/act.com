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
                standby: 40,
                progress: 20,
                ok: 30,
                ko: 10
              }
            ]
          },
          {
            status: 'status-ok',
            json: [
              {
                standby: 10,
                progress: 50,
                ok: 15,
                ko: 25
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 40,
                progress: 20,
                ok: 30,
                ko: 10
              }
            ]
          },
          {
            status: 'status-ok',
            json: [
              {
                standby: 10,
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
                standby: 40,
                progress: 20,
                ok: 30,
                ko: 10
              }
            ]
          },
          {
            status: 'status-ok',
            json: [
              {
                standby: 10,
                progress: 50,
                ok: 15,
                ko: 25
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 40,
                progress: 20,
                ok: 30,
                ko: 10
              }
            ]
          }]
      };
    }]);
})();