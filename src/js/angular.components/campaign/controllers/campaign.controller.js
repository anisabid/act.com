'use strict';

(function () {

  angular.module('actApp')
    .controller('CampaignController', ['$scope', '$state', 'CampaignListData', 'TestListData', 'CampaignDetailData', 'ActScrollbarConfig',
      function ($scope, $state, CampaignListData, TestListData, CampaignDetailData, ActScrollbarConfig) {

        $scope.scrollbarConfig = ActScrollbarConfig;
        $scope.sidebarHide = {
          left : false,
          right: false
        }

        $scope.campaign = {
          items: CampaignListData,
          currentItem: CampaignListData[1],
          tests: TestListData,
          detail: CampaignDetailData
        };

        $scope.toggleSidebar = function (direction) {
          $scope.sidebarHide[direction] = !$scope.sidebarHide[direction];
        };

        $scope.newSubItem = function (scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            status: 0,
            nodes: []
          });
        };

        $scope.newSubItem = function (scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            status: 0,
            nodes: []
          });
        };

      }]);
})();