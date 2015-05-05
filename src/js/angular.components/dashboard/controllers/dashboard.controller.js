(function () {
  'use strict';

  actApp
    .controller('DashboardController', ['$scope', function ($scope) {

      $scope.dashboard = {
        sources: [{
          application: 1,
          status: 'ok',
          json: {
            standby: 200,
            progress: 20,
            ok: 30,
            ko: 10
          }
        },
          {
            application: 1,
            status: 'ko',
            json: {
              standby: 40,
              progress: 20,
              ok: 30,
              ko: 10
            }
          },
          {
            application: 1,
            status: 'progress',
            json: {
              standby: 10,
              progress: 50,
              ok: 15,
              ko: 25
            }
          },
          {
            application: 2,
            status: 'progress',
            json: {
              standby: 10,
              progress: 50,
              ok: 15,
              ko: 25
            }
          },
          {
            application: 3,
            status: 'ok',
            json: {
              standby: 10,
              progress: 20,
              ok: 30,
              ko: 10
            }
          },
          {
            application: 3,
            status: 'progress',
            json: {
              standby: 40,
              progress: 20,
              ok: 30,
              ko: 10
            }
          },
          {
            application: 4,
            status: 'ok',
            json: {
              standby: 10,
              progress: 50,
              ok: 15,
              ko: 25
            }
          },
          {
            application: 4,
            status: 'ko',
            json: {
              standby: 40,
              progress: 20,
              ok: 30,
              ko: 10
            }
          }],
        applications: [
          {
            id: 1,
            name: "Application 1"
          },
          {
            id: 2,
            name: "Application 2"
          },
          {
            id: 3,
            name: "Application 3"
          },
          {
            id: 4,
            name: "Application 4"
          },
          {
            id: 5,
            name: "Application 5"
          }
        ]
      };
    }]);
})();