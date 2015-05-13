'use strict';

(function () {

  angular.module('actApp')
    .factory('ApplicationFactory', ['$http', '$q', 'ActRest',
      function ($http, $q, ActRest) {

        var $f = {
          getApplicationList: function () {
            var defer = $q.defer();

            var params = {
              method: ActRest.application.list.method,
              url: ActRest.baseUrl + ActRest.application.list.url
            };

            $http(params)
              .success(function (data) {
                return defer.resolve(data);
              })
              .error(function (data, status) {
                return defer.reject(status);
              })

            return defer.promise;
          }
        };

        return {
          getApplicationList: $f.getApplicationList
        };

      }]);

})();