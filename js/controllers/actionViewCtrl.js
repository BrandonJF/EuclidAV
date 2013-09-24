euclidAV.controller("ActionViewCtrl", ['$scope','$http','$location','localStorageService', 'aiService', function ($scope, $http, $location, localStorageService, aiService) {

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

  $scope.getUserAis = function () {
    aiService.getUserAis().success(function (data, status) { 
      //console.log(data);
      $scope.ai.actionItems = aiService.modifyAis(data.actionItems);
      aiService.setBadge(data.RECORDCOUNT.toString());
      //console.log("getuserai scope",$scope.$id);
      //console.log($scope);

    }).error(function (data, status) {
      $scope.ai.details = "Not able to make a connection." + data + status;
    });
  }

  $scope.searchUserAi = function(aiNumber){
  	$scope.navigateTo('/ai/' + aiNumber);
  }

  $scope.getUserAis();

  window.ActionViewCtrl = $scope;
}]);
