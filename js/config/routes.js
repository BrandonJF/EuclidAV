euclidAV.config(['$routeProvider', '$compileProvider', function($routeProvider,$compileProvider) {
  $routeProvider.
      when('/', {templateUrl: '/views/userAiListView.htm'}).
      when('/bookmarks', {templateUrl: '/views/userBookmarks.htm'}).
      when('/ai/:aiNumber', {templateUrl: '/views/aiDetailView.htm', controller: 'aiDetailCtrl'}).
      //when('/phones/:phoneId', {templateUrl: 'views/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/views/userAiListView.htm'});
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
}])
;