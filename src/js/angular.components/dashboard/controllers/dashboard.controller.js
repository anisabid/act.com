(function () {
  'use strict';

  actApp.controller('DashboardController', ['$scope', function ($scope) {
    $scope.dashboard = {
      sources: [{
        status: 'status-ok',
        json: [
          {
            status: 'standby',
            val: 0.4
          },
          {
            status: 'progress',
            val: 0.2
          },
          {
            status: 'ok',
            val: 0.3
          },
          {
            status: 'ko',
            val: 0.1
          }
        ]
      },
        {
          status: 'status-ko',
          json: [
            {
              status: 'standby',
              val: 0.4
            },
            {
              status: 'progress',
              val: 0.2
            },
            {
              status: 'ok',
              val: 0.3
            },
            {
              status: 'ko',
              val: 0.1
            }
          ]
        }]
    };
  }]);
})();