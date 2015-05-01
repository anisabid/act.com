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

(function () {
  'use strict';

  actApp.directive('amCampaign', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        parameters: '='
      },
      templateUrl: '../src/js/angular.components/commun/directives/campaign.directive.html',
      link: function (scope, elem, attrs) {

        scope.campaign = {
          parameters: scope.parameters
        };

      }
    };
  }]);
})();
(function (angular, d3js, Obj) {
  'use strict';

  actApp.directive('amChartCircle', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        parameters: '=',
        options: '='
      },
      template: '<div></div>',
      link: function (scope, elem, attrs) {

        $timeout(function () {
          var settings = {
              // These are the defaults.
              backgroundColor: "white",
              width: (attrs.width == undefined) ? 70 : attrs.width,
              height: (attrs.height == undefined) ? 70 : attrs.height,
              json: scope.parameters
            },
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

          var color = [],
            data = [],
            obj = {},
            length = 0,
            key,
            json = settings.json,
            svg = d3js.select(elem[0]).append("svg")
              .attr("width", settings.width)
              .attr("height", settings.height);

          var json = json[0];

          for (key in json) {
            if (json.hasOwnProperty(key)) {
              color.push(Obj.color[key]);
              data.push(json[key]);
              obj[key] = json[key];
              length++;
            }
          }

          svg.append("text")
            .attr("x", "52%")
            .attr("y", "60%")
            .attr("text-anchor", "middle")
            .text((obj.ok * 100) + "%");

          svg.selectAll(".arc")
            .data(drawArcs(data, length))
            .enter().append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ")")
            .append("path")
            .attr("fill", function (d, i) {
              return color[i];
            })
            .attr("d", arc);

        });

      }
    };
  }]);
})(angular, d3, Obj);

(function () {
  'use strict';

  actApp.directive('amIndicator', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        parameters: '='
      },
      templateUrl: '../src/js/angular.components/commun/directives/indicator.directive.html',
      link: function (scope, elem, attrs) {

        scope.indicator = {
          parameters: scope.parameters,
          title: attrs.title,
          class: attrs.class,
          show: eval(attrs.show)
        };


      }
    };
  }]);
})();


(function () {
  'use strict';

  actApp
    .controller('DashboardController', ['$scope', function ($scope) {
      $scope.dashboard = {
        sources: [{
          status: 'status-ok',
          json: [
            {
              standby: 200,
              progress: 20,
              ok: 30,
              ko: 10
            }
          ]
        },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          },
          {
            status: 'status-ok',
            json: [
              {
                standby: 0.1,
                progress: 0.5,
                ok: 0.15,
                ko: 0.25
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          },{
            status: 'status-ok',
            json: [
              {
                standby: 200,
                progress: 20,
                ok: 30,
                ko: 10
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          },
          {
            status: 'status-ok',
            json: [
              {
                standby: 0.1,
                progress: 0.5,
                ok: 0.15,
                ko: 0.25
              }
            ]
          },
          {
            status: 'status-ko',
            json: [
              {
                standby: 0.4,
                progress: 0.2,
                ok: 0.3,
                ko: 0.1
              }
            ]
          }]
      };
    }]);
})();


