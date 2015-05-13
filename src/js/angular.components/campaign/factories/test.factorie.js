'use strict';

(function () {

  angular.module('actApp')
    .factory('TestFactory', ['$http', '$q', 'ActRest',
      function ($http, $q, ActRest) {

        var $f = {
          getTestList: function () {
            var defer = $q.defer();

            var params = {
              method: ActRest.test.list.method,
              url: ActRest.baseUrl + ActRest.test.list.url
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
          getTestList: $f.getTestList
        };

      }]);

})();