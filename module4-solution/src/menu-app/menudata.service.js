(function () {
  'use strict';

  angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('menuServiceUrl', "https://lukacsd-chinabistro.herokuapp.com");

  MenuDataService.$inject = ['$http', 'menuServiceUrl'];
  function MenuDataService($http, menuServiceUrl) {
    this.getAllCategories = function() {
      return $http.get( menuServiceUrl + "/categories.json" )
        .then(function(response) {
          return response.data;
        });
    };

    this.getItemsForCategory = function(categoryShortName) {
      return $http.get( menuServiceUrl + "/menu_items.json?category=" + categoryShortName )
        .then(function(response) {
          return response.data;
        });
    };
  }

})();
