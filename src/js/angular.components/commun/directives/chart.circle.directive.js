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
            if (json.hasOwnProperty(key)) {
              color.push(Obj.color[key]);
              data.push(json[key]);
              obj[key] = json[key];
              summ += json[key];
              length++;
            }
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