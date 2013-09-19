euclidAV.controller("ActionViewCtrl", ['$scope','$http','localStorageService', 'aiService', function ($scope, $http, localStorageService, aiService) {

  $scope.ai = {
    test: "This is a test",
    actionItems: [],//[{"LISTITEMNUM":"12345","ACTIONTYPE":"TEST"}]
    bookmarks:localStorageService.get('userBookmarks')||[]
  }

  //console.log($scope);

  $scope.storeBookmark = function(aiNumber){
      $scope.ai.bookmarks.push(aiNumber);
     localStorageService.add('userBookmarks',$scope.ai.bookmarks);
  }

   $scope.removeBookmark = function(aiNumber){
      $scope.ai.bookmarks = _.without($scope.ai.bookmarks,aiNumber);
     localStorageService.add('userBookmarks',$scope.ai.bookmarks);
  }

  $scope.toggleBookmark = function(actionItem){
    //console.log(_.indexOf($scope.ai.bookmarks, actionItem.LISTITEMNUM)!==-1);
    var containsBookmark = _.indexOf($scope.ai.bookmarks, actionItem.LISTITEMNUM)!==-1;
    if (containsBookmark == true){
      $scope.removeBookmark(actionItem.LISTITEMNUM);
      actionItem.bookmarked = false;
    }
    else if(containsBookmark == false) {
       $scope.storeBookmark(actionItem.LISTITEMNUM);
      actionItem.bookmarked = true;
    }
  }

  $scope.isBookmarked = function(aiNumber){
    return _.indexOf($scope.ai.bookmarks, aiNumber)!==-1 ? true : false;
  }

  $scope.getUserAis = function () {
    aiService.getUserAis().success(function (data, status) { 
      //console.log(data);
      $scope.ai.actionItems = $scope.modifyAis(data.actionItems);
      //console.log("getuserai scope",$scope.$id);
      //console.log($scope);

    }).error(function (data, status) {
      $scope.ai.details = "Not able to make a connection." + data + status;
    });
  }

  $scope.modifyAis = function(actionItems){
    $.each(actionItems, function(index,actionItem){
      actionItem.actionTypeClass = actionItem.ACTIONTYPE.replace(/\s+/g,'');
      actionItem.bookmarked = $scope.isBookmarked(actionItem.LISTITEMNUM);
    });
    return actionItems;
  }
  $scope.getUserAis();

  window.ActionViewCtrl = $scope;
}]);
