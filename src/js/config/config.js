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
