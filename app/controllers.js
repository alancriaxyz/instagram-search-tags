'use strict';

angular.module('app.controllers', []).controller('MainCtrl', ['$scope', 'instagram', function ($scope, instagram) {

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
  
    instagram.get(30, $scope.search).success(function(response) {
      instagramSuccess($scope, response);
    });

  };

}]);