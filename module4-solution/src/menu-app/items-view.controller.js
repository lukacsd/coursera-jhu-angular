(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsViewController', ItemsViewController);

  ItemsViewController.$inject = ['data']
  function ItemsViewController(data) {
    this.menuItems = data.menu_items;
    this.categoryName = data.category.name;
  }

})();
