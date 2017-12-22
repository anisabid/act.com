'use strict';

(function () {

  var actApp = angular.module('actApp', [
    'ui.router',
    'ui.tree',
    'ngScrollbars',
    '720kb.tooltips'
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
            controller: 'DashboardController',
            resolve: {
              CampaignListData: ['CampaignFactory',
                function (CampaignFactory) {
                  return CampaignFactory.getCampaignList();
                }],
              ApplicationListData: ['ApplicationFactory',
                function (ApplicationFactory) {
                  return ApplicationFactory.getApplicationList();
                }]
            }
          })
          .state('main.campaign', {
            abstract: true,
            templateUrl: FormatUrlProvider.getTemplatePath('campaign') + 'detail.html',
            controller: 'CampaignController',
            resolve: {
              CampaignListData: ['CampaignFactory',
                function (CampaignFactory) {
                  return CampaignFactory.getCampaignList();
                }],
              TestListData: ['TestFactory',
                function (TestFactory) {
                  return TestFactory.getTestList();
                }],
              CampaignDetailData: ['CampaignFactory',
                function (CampaignFactory) {
                  return CampaignFactory.getCampaignDetail();
                }
              ]
            }
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
          });

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
        .constant('AppConfig', {
            openweathermap: {
                APIKEY: '65c6c40c1b9d6ca2ec40bda196c9b4f4'
            }

        });


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
        .constant('ActScrollbarConfig', {

            autoHideScrollbar: true,
            theme: 'light',
            advanced: {
                updateOnContentResize: true
            }

        });

    angular.module('actApp')
        .constant('ActStatusConfig', {

            status: ['standby', 'progress', 'ok', 'ko'],
            color: ['#333333', '#f7ca18', '#2bb38a', '#e34b51'],
            icon: ['fa-power-off', 'fa-warning', 'fa-thumbs-up', 'fa-thumbs-down']

        });

    angular.module('actApp')
        .constant('ActRest', {

            baseUrl: 'http://localhost:3000/', //'http://localhost:8888/jsonmock/',
            campaign: {
                list: {
                    method: 'GET',
                    // https://home.openweathermap.org/api_keys  anab.tn+01@gmail.com / Anis1983
                    url: 'http://api.openweathermap.org/data/2.5/forecast?q=Abbeville&APPID=65c6c40c1b9d6ca2ec40bda196c9b4f4' //'campaigns.mock.json'
                },
                detail: {
                    method: 'GET',
                    url: 'campaignTree' //'campaign.tree.mock.json'
                }
            },
            application: {
                list: {
                    method: 'GET',
                    url: 'application' //'applications.mock.json'
                }
            },
            test: {
                list: {
                    method: 'GET',
                    url: 'test' //'tests.mock.json'
                }
            }

        });

})();

'use strict';

(function () {

  angular.module('actApp')
    .controller('CampaignController', ['$scope', '$state', '$window', 'CampaignListData', 'TestListData', 'CampaignDetailData', 'ActScrollbarConfig',
      function ($scope, $state, $window, CampaignListData, TestListData, CampaignDetailData, ActScrollbarConfig) {

        $scope.scrollbarConfig = ActScrollbarConfig;

        $scope.campaign = {
          items: CampaignListData,
          currentItem: CampaignListData[1],
          tests: TestListData,
          detail: CampaignDetailData,
          modeEdit: false
        };
        // Toggle Mode Edit
        $scope.toggleModeEdit = function () {
          $scope.campaign.modeEdit = !$scope.campaign.modeEdit;
          console.log($scope.campaign.modeEdit);
        };

        $scope.globalHide = {
          view: {
            left: false,
            right: false,
            center: {
              header: true
            }
          }
        };
        // Actions Toggle Sidebar
        $scope.toggleViewLeftRight = function (direction) {
          $scope.globalHide.view[direction] = !$scope.globalHide.view[direction];
        };
        // Actions Toggle Center Header
        $scope.toggleViewCenterHeader = function () {
          $scope.globalHide.view.center.header = !$scope.globalHide.view.center.header;
        };

        // Actions Tree
        $scope.onRemove = function (scope) {
          if ($window.confirm('Are you sure to remove ?')) {
            scope.remove();
          }
        };

        $scope.update = false;
        /*$scope.onUpdate = function () {
          $scope.update = !$scope.update;
        };*/

        $scope.onStatusChange = function (scope) {
          var nodeData = scope.$parentNodeScope.$modelValue;

          var nodeParent = scope.$parentNodeScope;

          var nodesParent = scope.$parentNodesScope;

          /*console.log(nodeData.nodes.length);
          console.log(nodeData);

          console.log(nodesParent.$modelValue);

          console.log(nodeParent.$childNodesScope);*/
        };

        var getRootNodesScope = function() {
          return angular.element(document.getElementById("tree-main")).scope();
        };

        $scope.onCollapseAll = function() {
          var scope = getRootNodesScope();
          scope.collapseAll();
        };

        $scope.onExpandAll = function() {
          var scope = getRootNodesScope();
          scope.expandAll();
        };


        $scope.onAddItem = function (scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            status: 0,
            nodes: []
          });
        };

      }]);
})();
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

'use strict';

(function () {

  angular.module('actApp')
    .directive('amCampaign', ['FormatUrl', function (FormatUrl) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          parameters: '=',
          full: '=',
          callback: '&onCallback'
        },
        templateUrl: FormatUrl.getDirectivePath('common') + 'campaign.directive.html',
        link: function (scope, elem, attrs) {

          scope.campaign = {
            bodyCollapsed: true,
            parameters: scope.parameters,
            full: scope.full,
            // Function collapsible content
            collapsibleToggle: function () {
              scope.campaign.bodyCollapsed = !scope.campaign.bodyCollapsed;
            }
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

  function status (ActStatusConfig, type, imput) {
    switch (type) {
      case 'color':
        return ActStatusConfig.color[imput];
        break;
      case 'icon':
        return ActStatusConfig.icon[imput];
        break;
      default:
        // do something
        return ActStatusConfig.status[imput];
    }
  }

  angular.module('actApp')
    .filter('statusToColor', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'color', input);
      };
    }]);

  angular.module('actApp')
    .filter('statusToText', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'text', input);
      };
    }]);

  angular.module('actApp')
    .filter('statusToClass', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'class', input);
      };
    }]);

  angular.module('actApp')
    .filter('statusToIcon', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'icon', input);
      };
    }]);

  angular.module('actApp')
    .filter('statusToIconColor', ['ActStatusConfig', function (ActStatusConfig) {
      return function (input) {
        return status(ActStatusConfig, 'icon', input) +" "+ status(ActStatusConfig, 'color', input);
      };
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
    .controller('DashboardController', ['$scope', '$state', 'CampaignListData', 'ApplicationListData',
      function ($scope, $state, CampaignListData, ApplicationListData) {

        $scope.dashboard = {
          sources: CampaignListData,
          applications: ApplicationListData
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
