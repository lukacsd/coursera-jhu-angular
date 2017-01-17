(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.directive('validMenuItem', MenuItemDirective);

function MenuItemDirective() {
  var ddo = {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.validMenuItem = function(modelValue, viewValue) {
        return !angular.equals(scope.ctrl.getMenuItemByShortName(modelValue), {});
      };
    }
  };

  return ddo;
}

SignupController.$inject = ['MyInfoService', 'validMenuItems'];
function SignupController(MyInfoService, validMenuItems) {
  var $ctrl = this;

  $ctrl.message = "";
  $ctrl.user = MyInfoService.getUser();

  $ctrl.getMenuItemByShortName = function(item) {
    if (item && item.length > 0) {
      var itemUpper = item.toUpperCase();
      for (var i = 0; i < validMenuItems.length; i++) {
        if (validMenuItems[i].shortName === itemUpper) {
          return validMenuItems[i];
        }
      }
    }
    return {};
  };

  $ctrl.submit = function() {
    $ctrl.user.favourite = $ctrl.getMenuItemByShortName($ctrl.user.favourite.shortName);
    MyInfoService.setUser($ctrl.user);
    $ctrl.message = "Your information has been saved";
  };
}

})();
