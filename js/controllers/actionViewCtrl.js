euclidAV.controller("ActionViewCtrl", ['$scope','$http','$location','localStorageService', 'aiService','userService', function ($scope, $http, $location, localStorageService, aiService, userService) {

  $scope.ai = {
    actionItems: []//[{"LISTITEMNUM":"12345","ACTIONTYPE":"TEST"}]
    //bookmarks:aiService.bookmarks//localStorageService.get('userBookmarks')||[]
  }
  $scope.aiService = aiService;
  // $scope.bookmarks = $scope.aiService.bookmarks;
  // $scope.bookmarks = $scope.aiService.bookmarks;
  $scope.navigateTo = function(path){
  	$location.path(path);
  }

  //console.log($scope);

  // $scope.storeBookmark = function(aiNumber){
  //     $scope.ai.bookmarks.push(aiNumber);
  //    localStorageService.add('userBookmarks',$scope.ai.bookmarks);
  // }

  //  $scope.removeBookmark = function(aiNumber){
  //     $scope.ai.bookmarks = _.without($scope.ai.bookmarks,aiNumber);
  //    localStorageService.add('userBookmarks',$scope.ai.bookmarks);
  // }

  // $scope.toggleBookmark = function(actionItem){
  //   //console.log(_.indexOf($scope.ai.bookmarks, actionItem.LISTITEMNUM)!==-1);
  //   var containsBookmark = _.indexOf($scope.ai.bookmarks, actionItem.LISTITEMNUM)!==-1;
  //   if (containsBookmark == true){
  //     $scope.removeBookmark(actionItem.LISTITEMNUM);
  //     actionItem.bookmarked = false;
  //   }
  //   else if(containsBookmark == false) {
  //      $scope.storeBookmark(actionItem.LISTITEMNUM);
  //     actionItem.bookmarked = true;
  //   }
  // }

  // $scope.isBookmarked = function(aiNumber){
  //   return _.indexOf($scope.ai.bookmarks, aiNumber)!==-1 ? true : false;
  // }

  $scope.getUserAis = function (username) {    
    console.log("getUserAis called for:", username)
    aiService.getUserAis(username).success(function (data, status) { 
      $scope.ai.actionItems = aiService.modifyAis(data.actionItems);
      aiService.setBadge(data.RECORDCOUNT.toString());
    }).error(function (data, status) {
      $scope.ai.details = "Not able to make a connection." + data + status;
    });
  }

  $scope.searchUserAi = function(aiNumber){
  	$scope.navigateTo('/ai/' + aiNumber);
  }

//localStorageService.add("username","JWU");
//localStorageService.remove("username");
$scope.username = localStorageService.get("username");
console.log($scope.username);
if ($scope.username !== null){
   $scope.getUserAis($scope.username);
}
else{
 chrome.cookies.get(
      {"url":"https://www.euclidtechnology.com/","name":"customercd"},
      function(cookie){
        var customercd = cookie.value;
         console.log("customercd is:",customercd);
         userService.getUsername(customercd).success(function(data){
    //alert("woot");
    console.log("getUsername data:", data)
    var username = data.WEBUSERID;
    localStorageService.add("username",username);
    $scope.getUserAis(username);
  })
      })



  // userService.getUsername().success(function(data){
  //   alert("woot");
  //   var username = data.WEBUSERID;
  //   localStorageService.add("username",username);
  //   $scope.getUserAis(username);
  // })


}
 
  window.ActionViewCtrl = $scope;
}]);
