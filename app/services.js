'use strict';

angular.module('app.services', []).factory('instagram', ['$http',
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