'use strict';

(function () {

  angular.module('actApp')
    .controller('DashboardController', ['$scope', '$state', 'CampaignListData', 'ApplicationListData',
      function ($scope, $state, CampaignListData, ApplicationListData) {

        $scope.dashboard = {
          sources: CampaignListData,
          applications: ApplicationListData
        };

      }]);
})();