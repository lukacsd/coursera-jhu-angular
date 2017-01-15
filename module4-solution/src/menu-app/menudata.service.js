(function () {
  'use strict';

  angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('menuServiceUrl', "https://davids-restaurant.herokuapp.com/");

  MenuDataService.$inject = ['$http', 'menuServiceUrl'];
  function MenuDataService($http, menuServiceUrl) {
    this.getAllCategories = function() {
      return $http({
        method: "GET",
        url: (menuServiceUrl + "categories.json")
      });
    };

    this.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (menuServiceUrl + "menu_items.json?category=" + categoryShortName)
      });
    };
  }

})();
