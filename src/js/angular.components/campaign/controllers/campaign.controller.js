'use strict';

(function () {

  angular.module('actApp')
    .controller('CampaignController', ['$scope', 'CampaignListData', 'TestListData', function ($scope, CampaignListData, TestListData) {

      $scope.campaign = {
        sources: CampaignListData
      };
      $scope.test = {
        sources: TestListData
      };
    }]);

})();