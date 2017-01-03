(function () {
  'use strict';

  angular
    .module('lunchCheckerApp', [])
    .controller('lunchCheckerController', LunchCheckerController);

  var emptyMessage = "Please enter data first";
  var enjoyMessage = "Enjoy!";
  var tooMuchMessage = "Too much!";

  LunchCheckerController.$inject = ['$scope'];
  function LunchCheckerController($scope) {
    $scope.lunchItems = "";
    $scope.lunchMessage = "";

    $scope.checkNumberOfItems = function() {
      $scope.lunchMessage = getMessage($scope.lunchItems);
    };

    $scope.messageColor = function() {
      if ($scope.lunchMessage === emptyMessage) {
        return 'bg-danger text-danger';
      }
      return 'bg-success text-success';
    };
  };

  function getMessage(items) {
    if (!isEmpty(items)) {
      var split = items.split(',');
      var cnt = 0;
      for (var i = 0; i < split.length; i++) {
        if (!isEmpty(split[i].trim())) {
          cnt++;
        }
      }

      if (cnt > 3) {
        return tooMuchMessage;
      }
      if (cnt > 0) {
        return enjoyMessage;
      }
    }
    return emptyMessage;
  };

  function isEmpty(str) {
    return (!str || 0 === str.length);
  };

})();
