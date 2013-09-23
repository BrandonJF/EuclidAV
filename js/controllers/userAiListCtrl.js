euclidAV.controller("UserAiListCtrl", function($scope, aiService){
  $scope.openTest = "Open TEST";
  $scope.openUserAi = function(aiNumber){
    chrome.tabs.create({
      "url":"https://www.euclidtechnology.com/support/ActionItem.aspx?cv_ActionItem="+aiNumber
    })
  }

  $scope.toggleBookmark = function(actionItem){aiService.toggleBookmark(actionItem);}
  window.UserAiListCtrl = $scope;
});