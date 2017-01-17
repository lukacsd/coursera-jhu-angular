(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/menu-app/templates/home.template.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menu-app/templates/categories-view.template.html',
        controller: 'CategoriesViewController as ctrl',
          resolve: {
            data: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                  }]
          }
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/menu-app/templates/items-view.template.html',
        controller: 'ItemsViewController as ctrl',
        resolve: {
          data: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                  return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
        }
      });
  }

})();
