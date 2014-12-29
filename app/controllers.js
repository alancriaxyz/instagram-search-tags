'use strict';

angular.module('app.controllers', []).controller('MainCtrl', ['$scope', '$timeout', 'instagram', function ($scope, $timeout, instagram) {

  $scope.search = $scope.search || 'angularjs';

  var instagramSuccess = function(scope, res) {
    if (res.meta.code !== 200) {
      scope.error = res.meta.error_type + ' | ' + res.meta.error_message;
      return;
    }
    if (res.data.length > 0) {
      scope.pics = res.data;
    } else {
      scope.error = true;
    }
  };

  $scope.executeSearch = function () {
    $scope.error = false;
    $scope.pics  = [];
  
    if ($scope.search) {
      instagram.get(30, $scope.search).success(function(response) {
        instagramSuccess($scope, response);
      });
    }  
  };


}]);