'use strict';

var app = angular.module ("starter", ['ngResource']);

// Factory
app.factory('instagram', ['$http',
  function($http) {
    
    // get your own client id http://instagram.com/developer/
    var base = "https://api.instagram.com/v1";
    var clientId = '642176ece1e7445e99244cec26f4de1f';

    return {
      'get': function(count, hashtag) {
        var request = '/tags/' + hashtag + '/media/recent';
        var url = base + request;
        var config = {
          'params': {
            'client_id': clientId,
            'count': count,
            'callback': 'JSON_CALLBACK'
          }
        };
        return $http.jsonp(url, config);
      }
    };

  }
]);

// Directive
app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

// Controller
app.controller('MainCtrl', ['$scope', 'instagram', function ($scope, instagram) {

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
  
    instagram.get(20, $scope.search).success(function(response) {
      instagramSuccess($scope, response);
    });

  };

}]);