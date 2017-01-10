(function () {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('menuServiceUrl', "https://davids-restaurant.herokuapp.com/menu_items.json")
    .constant('nothingFoundMessage', "Nothing found.")
    .constant('httpErrorMessage', "Error while retrieving menu items.");

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'templates/foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'search',
        bindToController: true
      };

      return ddo;
    }

    NarrowItDownController.$inject = ['$scope', 'MenuSearchService', 'nothingFoundMessage', 'httpErrorMessage'];
    function NarrowItDownController($scope, MenuSearchService, nothingFoundMessage, httpErrorMessage) {
      var self = this;

      self.found = [];
      self.message = "";

      self.getMatchedMenuItems = function() {
        self.found = [];
        self.message = "";
        if (!$scope.searchTerm || 0 === $scope.searchTerm.length) {
          self.message = nothingFoundMessage;
        } else {
          MenuSearchService
            .getMatchedMenuItems($scope.searchTerm)
            .then(function(response) {
              if (response.length === 0) {
                self.message = nothingFoundMessage;
              } else {
                self.found = response;
              }
            })
            .catch(function(error) {
              self.message = httpErrorMessage;
            });
        }
      };

      self.removeItem = function(index) {
        self.found.splice(index, 1);
      };
    };

    MenuSearchService.$inject = ['$http', 'menuServiceUrl'];
    function MenuSearchService($http, menuServiceUrl) {
      this.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: "GET",
          url: menuServiceUrl,
        }).then(function(response) {
          var found = [];
          var items = response.data.menu_items;
          for (var i = 0; i < items.length; i++){
            if (items[i].description.search(searchTerm) != -1) {
              found.push(items[i]);
            }
          }
          return found;
        });
      };
    }

})();
