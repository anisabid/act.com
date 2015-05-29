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
          detail: CampaignDetailData,
          modeEdit: false
        };
        // Toggle Mode Edit
        $scope.toggleModeEdit = function () {
          $scope.campaign.modeEdit = !$scope.campaign.modeEdit;
          console.log($scope.campaign.modeEdit);
        };

        $scope.globalHide = {
          view: {
            left: false,
            right: false,
            center: {
              header: true
            }
          }
        };
        // Actions Toggle Sidebar
        $scope.toggleViewLeftRight = function (direction) {
          $scope.globalHide.view[direction] = !$scope.globalHide.view[direction];
        };
        // Actions Toggle Center Header
        $scope.toggleViewCenterHeader = function () {
          $scope.globalHide.view.center.header = !$scope.globalHide.view.center.header;
        };

        // Actions Tree
        $scope.onRemove = function (scope) {
          if ($window.confirm('Are you sure to remove ?')) {
            scope.remove();
          }
        };

        $scope.update = false;
        /*$scope.onUpdate = function () {
          $scope.update = !$scope.update;
        };*/

        $scope.onStatusChange = function (scope) {
          var nodeData = scope.$parentNodeScope.$modelValue;

          var nodeParent = scope.$parentNodeScope;

          var nodesParent = scope.$parentNodesScope;

          /*console.log(nodeData.nodes.length);
          console.log(nodeData);

          console.log(nodesParent.$modelValue);

          console.log(nodeParent.$childNodesScope);*/
        };

        var getRootNodesScope = function() {
          return angular.element(document.getElementById("tree-main")).scope();
        };

        $scope.onCollapseAll = function() {
          var scope = getRootNodesScope();
          scope.collapseAll();
        };

        $scope.onExpandAll = function() {
          var scope = getRootNodesScope();
          scope.expandAll();
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