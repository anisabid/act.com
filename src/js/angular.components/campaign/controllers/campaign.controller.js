'use strict';

(function () {

  angular.module('actApp')
    .controller('CampaignController', ['$scope', '$state', '$window', 'CampaignListData', 'TestListData', 'CampaignDetailData', 'ActScrollbarConfig',
      function ($scope, $state, $window, CampaignListData, TestListData, CampaignDetailData, ActScrollbarConfig) {

        $scope.scrollbarConfig = ActScrollbarConfig;

        $scope.campaign = {
          items: CampaignListData,
          currentItem: CampaignListData[1],
          tests: TestListData,
          detail: CampaignDetailData
        };


        // Actions Toggle Sidebar
        $scope.globalHide = {
          view: {
            left: false,
            right: false,
            center: {
              header: true
            }
          }
        };
        $scope.toggleViewLeftRight = function (direction) {
          $scope.globalHide.view[direction] = !$scope.globalHide.view[direction];
        };

        $scope.toggleViewCenterHeader = function () {
          console.log('call toggleViewCenterHeader = '+ $scope.globalHide.view.center.header);
          $scope.globalHide.view.center.header = !$scope.globalHide.view.center.header;
        };


        // Actions Tree

        $scope.onRemove = function (scope) {
          if ($window.confirm('Are you sure to remove ?')) {
            scope.remove();
          }
        };

        $scope.update = false;
        $scope.onUpdate = function () {
          //$scope.update = !$scope.update;

        };

        $scope.onStatusChange = function (scope) {
          var nodeData = scope.$parentNodeScope.$modelValue;

          var nodeParent = scope.$parentNodeScope;

          var nodesParent = scope.$parentNodesScope;

          console.log(nodeData.nodes.length);
          console.log(nodeData);

          console.log(nodesParent.$modelValue);

          console.log(nodeParent.$childNodesScope);
        };


        $scope.onAddItem = function (scope) {
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