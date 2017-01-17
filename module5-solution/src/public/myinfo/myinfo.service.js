(function () {
"use strict";

angular.module('public')
.service('MyInfoService', MyInfoService);

function MyInfoService() {
  var self = this;
  self.user = {};

  self.getUser = function() {
    return self.user;
  };

  self.setUser = function(user) {
    self.user = user;
  };
}

})();
