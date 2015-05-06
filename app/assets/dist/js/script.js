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

  actApp.directive('amChartBar', ['$timeout', function ($timeout) {
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
          };
          var color = [],
            results,
            data = [],
            chart,
            bars,
            margin = 100,
            w = 8,
            h = 70,
            x, y,
            xAxis, yAxis;

          results = d3.map(settings.json);


          var max = 0,
            quotient = 0;
          results.forEach(function (key, val) {
            //for (key in val) {

                var result = {};
                result.status = key;
                result.val = val;
                data.push(result);
                max = Math.max(max, val);
                color.push(Obj.color[key]);

            //}
          });


          quotient = max / h;


          chart = d3.select(elem[0]).append('svg')
            .attr('class', 'chart')
            .attr('width', 35)
            .attr('height', h)
            .append('g').attr('transform', 'translate(0, 100)');



          chart.select('g')
            .attr('transform', 'translate(0, 100)');


          // Bars
          bars = chart.append('g')
            .attr('class', 'bars');

          bars.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr("fill", function (d, i) {
              return color[i];
            })
            .attr('x', function (d, i) {
              return 8.5 * i;
            })
            .attr('y', function (d) {
              return (h - margin) - (d.val / quotient) + .5
            })
            .attr('width', w)
            .attr('height', function (d) {
              return ( d.val / quotient )
            })
            .append('g');

        });

      }
    };
  }]);
})(angular, d3, Obj);
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
            quotient = 0,
            summ = 0,
            svg = d3js.select(elem[0]).append("svg")
              .attr("width", settings.width)
              .attr("height", settings.height);

          for (key in json) {

              color.push(Obj.color[key]);
              data.push(json[key]);
              obj[key] = json[key];
              summ += json[key];
              length++;

          }

          quotient = summ / 100;

          svg.append("text")
            .attr("x", "52%")
            .attr("y", "60%")
            .attr("text-anchor", "middle")
            .text( Math.round((obj.ok) / quotient)  + "%");

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
          application: 1,
          status: 'ok',
          json: {
            standby: 200,
            progress: 20,
            ok: 30,
            ko: 10
          }
        },
          {
            application: 1,
            status: 'ko',
            json: {
              standby: 40,
              progress: 20,
              ok: 30,
              ko: 10
            }
          },
          {
            application: 1,
            status: 'progress',
            json: {
              standby: 10,
              progress: 50,
              ok: 15,
              ko: 25
            }
          },
          {
            application: 2,
            status: 'progress',
            json: {
              standby: 10,
              progress: 50,
              ok: 15,
              ko: 25
            }
          },
          {
            application: 3,
            status: 'ok',
            json: {
              standby: 10,
              progress: 20,
              ok: 30,
              ko: 10
            }
          },
          {
            application: 3,
            status: 'progress',
            json: {
              standby: 40,
              progress: 20,
              ok: 30,
              ko: 10
            }
          },
          {
            application: 4,
            status: 'ok',
            json: {
              standby: 10,
              progress: 50,
              ok: 15,
              ko: 25
            }
          },
          {
            application: 4,
            status: 'ko',
            json: {
              standby: 40,
              progress: 20,
              ok: 30,
              ko: 10
            }
          }],
        applications: [
          {
            id: 1,
            name: "Application 1"
          },
          {
            id: 2,
            name: "Application 2"
          },
          {
            id: 3,
            name: "Application 3"
          },
          {
            id: 4,
            name: "Application 4"
          },
          {
            id: 5,
            name: "Application 5"
          }
        ]
      };
    }]);
})();


