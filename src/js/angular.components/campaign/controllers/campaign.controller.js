'use strict';

(function () {

  angular.module('actApp')
    .controller('CampaignController', ['$scope', '$state', 'CampaignListData', 'TestListData', 'CampaignDetailData', 'ActScrollbarConfig',
      function ($scope, $state, CampaignListData, TestListData, CampaignDetailData, ActScrollbarConfig) {

        $scope.scrollbarConfig = ActScrollbarConfig;

        $scope.campaign = {
          sources: CampaignListData,
          tests: TestListData,
          detail: CampaignDetailData
        };


      $scope.newSubItem = function(scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
          });
        };

      }]);
})();