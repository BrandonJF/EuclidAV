euclidAV.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: '/views/userAiListView.htm'}).
      when('/bookmarks', {templateUrl: '/views/userBookmarks.htm'}).
      when('/ai/:aiNumber', {templateUrl: '/views/aiDetailView.htm', controller: 'aiDetailCtrl'}).
      //when('/phones/:phoneId', {templateUrl: 'views/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/views/userAiListView.htm'});
}])
;