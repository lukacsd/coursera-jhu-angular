(function () {
  'use strict';

  angular
    .module('checkOffShoppingList', [])
    .controller('ToBuyController', ToBuyController)
    .controller('BoughtController', BoughtController)
    .provider('ItemService', ItemServiceProvider)
    .config(InitialItemList);

    ToBuyController.$inject = ['ItemService'];
    function ToBuyController(ItemService) {
      this.getItems = function() {
        return ItemService.getItemsToBuy();
      };

      this.checkOffItem = function(index) {
        ItemService.checkOffItem(index);
      };
    };

    BoughtController.$inject = ['ItemService'];
    function BoughtController(ItemService) {
      this.getItems = function() {
        return ItemService.getItemsBought();
      };
    };

    InitialItemList.$inject = ['ItemServiceProvider'];
    function InitialItemList(ItemServiceProvider) {
      ItemServiceProvider.items = [
        { name: "Ferrari", quantity: 1 },
        { name: "Jaguar", quantity: 5 },
        { name: "Tesla", quantity: 15 }
      ];
    };

    function ItemServiceProvider() {
      this.items = [];
      this.$get = function() {
        return new ItemService(this.items);
      }
    };

    function ItemService(shoppingList) {
      var items = shoppingList;
      var bought = [];

      this.getItemsToBuy = function() {
        return items;
      };

      this.getItemsBought = function() {
        return bought;
      };

      this.checkOffItem = function(index) {
        var splice = items.splice(index, 1);
        bought.push( splice[0] );
      };
    };
})();
