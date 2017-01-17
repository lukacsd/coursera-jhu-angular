(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MyInfoService', 'ApiPath'];
function MyInfoController(MyInfoService, ApiPath) {
  var $ctrl = this;

  $ctrl.angular = angular;
  $ctrl.basePath = ApiPath;
  $ctrl.user = MyInfoService.getUser();
}

})();
