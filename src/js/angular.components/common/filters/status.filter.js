'use strict';

(function () {

// recommended
  function status () {
    return function (items) {
      return items.filter(function (item) {
        return /^a/i.test(item.name);
      });
    };
  }

  /*angular.module('actApp')
    .filter('status', staus);*/

})();