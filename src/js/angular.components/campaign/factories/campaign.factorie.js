'use strict';

(function () {

  angular.module('actApp')
    .factory('CampaignFactory', ['$http', '$q', 'ActRest',
      function ($http, $q, ActRest) {

        var $f = {
          getCampaignList: function () {
            var defer = $q.defer();

            var params = {
              method: ActRest.campaign.list.method,
              url: ActRest.campaign.list.url
            };

            $http(params)
              .success(function (data) {
                return defer.resolve(data);
              })
              .error(function (data, status) {
                return defer.reject(status);
              });

            return defer.promise;
          },
          getCampaignDetail: function () {
            var defer = $q.defer();

            var params = {
              method: ActRest.campaign.detail.method,
              url: ActRest.baseUrl + ActRest.campaign.detail.url
            };

            $http(params)
              .success(function (data) {
                return defer.resolve(data);
              })
              .error(function (data, status) {
                return defer.reject(status);
              });

            return defer.promise;
          }
        };

        return {
          getCampaignList: $f.getCampaignList,
          getCampaignDetail: $f.getCampaignDetail
        };

      }]);

})();