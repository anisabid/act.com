'use strict';

(function (d3js, Obj) {

  angular.module('actApp')
    .directive('amChartBar', ['$timeout', function ($timeout) {
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
})(d3, Obj);