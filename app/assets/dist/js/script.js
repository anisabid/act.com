'use strict';

(function () {

  var actApp = angular.module('actApp', [
    'ui.router'
  ]);


  angular.module('actApp')
    .config(['$stateProvider', '$urlRouterProvider', 'FormatUrlProvider',
      function ($stateProvider, $urlRouterProvider, FormatUrlProvider) {
        $urlRouterProvider.otherwise('/main');

        $stateProvider

          .state('main', {
            abstract: true,
            templateUrl: FormatUrlProvider.getTemplatePath('main') + 'main.html',
            controller: 'MainController'
          })
            .state('main.dashboard', {
              url: '/dashboard',
              templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'list.html',
              controller: 'DashboardController'
            })
            .state('main.campaign', {
              abstract: true,
              templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.html',
              controller: 'CampaignController'
            })
          .state('main.campaign.detail', {
            url: '/campaign/:campaignId',
            views: {
              'viewPageContainerLeft': {
                templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.sidebarLeft.html'
              },
              'viewPageContainerRight': {
                templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.sidebarRight.html'
              },
              'viewPageContainerCenter': {
                templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.center.html'
              }
            }
          })
        ;

      }])

    .run([function () {

    }]);

})();
'use strict';

var Obj = {
  color: {
    standby: "#333333",
    progress: '#f7ca18',
    ok: "#2bb38a",
    ko: "#e34b51"
  }
};

(function () {

  angular.module('actApp')
    .constant('ActPaths', {

      baseUrl: './assets/dist/',
      templates: {
        main: 'tpl/main/templates/',
        dashboard: 'tpl/common/templates/',
        campaign: 'tpl/campaign/templates/'
      },
      directives: {
        common: 'tpl/common/directives/'
      }

    });

  angular.module('actApp')
    .constant('ActRest', {

      campaign: {
        list: 'http://localhost:8888/jsonmock/campaigns.mock.json'
      },
      application: {
        list: 'http://localhost:8888/jsonmock/applications.mock.json'
      }

    });

})();

'use strict';

(function() {

  angular.module('actApp')
    .factory('CampaignFactory', ['$http', '$q', 'ActRest',
      function($http, $q, ActRest) {

        var cf = {
          getCampList: function(searchParm) {
            var defer   = $q.defer();

            var url     = searchParm ? 'search' : 'list';
            var search  = searchParm ? {search: searchParm} : {};
            var parms   = {
              method: DgcRest.reqs.project[url].method,
              url:    DgcRest.baseUrl + DgcRest.reqs.project[url].url,
              params: search
            };

            $http(parms)
              .success(function(data) {
                return plf.getProjectData(data, searchParm).then(function(qData) {
                  return defer.resolve(qData);
                });
              })
              .error(function(data, status) {
                return defer.reject(status);
              });

            return defer.promise;
          },

          getProjectData: function(data, searchParm) {
            var defer = $q.defer();
            if(!searchParm) {
              defer.resolve(data);
              return defer.promise;
            }

            var requests = [];
            angular.forEach(data, function(project) {
              requests.push(plf.getProjectById(project.id));
            });

            $q.all(requests).then(function(result) {
              defer.resolve(result);
            });

            return defer.promise;
          },

          getProjectById: function(projectId) {
            var defer   = $q.defer();

            var parms   = {
              method: DgcRest.reqs.project.list.method,
              url:    DgcRest.baseUrl + DgcRest.reqs.project.list.url + '/' + projectId
            };

            $http(parms)
              .success(function(data) {
                return defer.resolve(data);
              })
              .error(function(data, status) {
                return defer.reject(status);
              });

            return defer.promise;
          }
        };

        return {
          getProjectList: plf.getProjectList
        };

      }]);

})();

'use strict';

(function () {

  angular.module('actApp')
    .directive('amCampaign', ['FormatUrl', function (FormatUrl) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          parameters: '='
        },
        templateUrl: FormatUrl.getDirectivePath('common') + 'campaign.directive.html',
        link: function (scope, elem, attrs) {

          scope.campaign = {
            parameters: scope.parameters
          };

        }
      };
    }]);
})();
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
'use strict';

(function (d3js, Obj) {

  angular.module('actApp')
    .directive('amChartCircle', ['$timeout', function ($timeout) {
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
              .text(Math.round((obj.ok) / quotient) + "%");

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
})(d3, Obj);

'use strict';

(function () {

  angular.module('actApp')
    .directive('amIndicator', ['FormatUrl', function (FormatUrl) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          parameters: '='
        },
        templateUrl: FormatUrl.getDirectivePath('common') + 'indicator.directive.html',
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

'use strict';

(function () {

  angular.module('actApp')
    .controller('CampaignController', ['$scope', function ($scope) {

      $scope.campaign = {};

    }]);

})();
'use strict';

(function () {

  angular.module('actApp')
    .provider('FormatUrl', ['ActPaths', function (ActPaths) {

      this.getBaseUrl = function () {
        return ActPaths.baseUrl;
      };

      this.getTemplatePath = function (stringUrl) {
        return this.getBaseUrl() + ActPaths.templates[stringUrl];
      };

      this.getDirectivePath = function (stringUrl) {
        return this.getBaseUrl() + ActPaths.directives[stringUrl];
      };

      this.$get = function () {

        return this;

      };
    }]);

})();

'use strict';

(function () {

  angular.module('actApp')
    .controller('DashboardController', ['$scope', '$state',
      function ($scope, $state) {

        $scope.dashboard = {
          sources: [
            {
            id: 20,
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
              id: 21,
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
              id: 22,
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
              id: 23,
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
              id: 24,
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
              id: 25,
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
              id: 26,
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
              id: 27,
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



'use strict';

(function () {

  angular.module('actApp')
    .controller('MainController', ['$scope', '$state',
      function($scope) {

        $scope.main = {};

      }]);
})();
