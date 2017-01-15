(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoriesViewController', CategoriesViewController);

  CategoriesViewController.$inject = ['data']
  function CategoriesViewController(data) {
    this.categories = data;
  }

})();
