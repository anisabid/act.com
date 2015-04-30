/**
 * @author Anis ABID
 * Created by abid on 27/04/2015.
 */

var actApp = angular.module('actApp', []);

/**
 * Created by abid on 29/04/2015.
 */
var Obj = {
  color: {
    standby: "#333333",
    progress: '#f7ca18',
    ok: "#2bb38a",
    ko: "#e34b51"
  }
};
(function (w, $, d3js, Obj) {
  "use strict";

  $.fn.d3jsCircle = function (options) {

    // This is the easiest way to have default options.
    var settings = $.extend({
        // These are the defaults.
        backgroundColor: "white",
        width: 70,
        height: 70
      }, options),
      outerRadius = Math.min(settings.width, settings.height) * 0.5,
      innerRadius = outerRadius * 0.85,
      arc = d3js.svg.arc(),
      pie = d3js.layout.pie().sort(null),
      drawArcs = function (data, nbr) {
        var arcs = pie(data),
          i = -1,
          arc;
        while (++i < nbr) {
          arc = arcs[i];
          arc.innerRadius = innerRadius;
          arc.outerRadius = outerRadius;
        }
        return arcs;
      };

    return d3js.selectAll(this.selector).each(function (d, i) {

      var color = [],
        data = [],
        obj = {},
        k,
        json = JSON.parse(d3js.select(this).attr('data-json')),
        svg = d3js.select(this).append("svg")
          .attr("width", settings.width)
          .attr("height", settings.height);

      for (k in json) {
        color.push(Obj.color[json[k].status]);
        data.push(json[k].val);
        obj[json[k].status] = json[k].val;
      }

      svg.append("text")
        .attr("x", "52%")
        .attr("y", "60%")
        .attr("text-anchor", "middle")
        .text((obj.ok * 100) + "%");

      svg.selectAll(".arc")
        .data(drawArcs(data, json.length))
        .enter().append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ")")
        .append("path")
        .attr("fill", function (d, i) {
          return color[i];
        })
        .attr("d", arc);
    });
  };
})(window, jQuery, d3, Obj);

(function ($) {
  'use strict';

  actApp.directive('amCampaign', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        index: '@',
        parameters: '='
      },
      templateUrl: '../src/js/angular.components/commun/directives/campaign.directive.html',
      link: function (scope, elem, attrs) {

        scope.campaign = {
          id: 'circle-' + scope.index + '-' + scope.$id,
          parameters: scope.parameters
        };

        $timeout(function(){
          $('#' + scope.campaign.id).d3jsCircle();
        });

      }
    };
  }]);
})(jQuery);



(function () {
  'use strict';

  actApp.controller('DashboardController', ['$scope', function ($scope) {
    $scope.dashboard = {
      sources: [{
        status: 'status-ok',
        json: [
          {
            status: 'standby',
            val: 0.4
          },
          {
            status: 'progress',
            val: 0.2
          },
          {
            status: 'ok',
            val: 0.3
          },
          {
            status: 'ko',
            val: 0.1
          }
        ]
      },
        {
          status: 'status-ko',
          json: [
            {
              status: 'standby',
              val: 0.4
            },
            {
              status: 'progress',
              val: 0.2
            },
            {
              status: 'ok',
              val: 0.3
            },
            {
              status: 'ko',
              val: 0.1
            }
          ]
        }]
    };
  }]);
})();


