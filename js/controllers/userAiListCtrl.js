euclidAV.controller("UserAiListCtrl", function($scope){
  $scope.openTest = "Open TEST";
  $scope.openUserAi = function(aiNumber){
    chrome.tabs.create({
      "url":"https://www.euclidtechnology.com/support/ActionItem.aspx?cv_ActionItem="+aiNumber
    })
  }
  window.UserAiListCtrl = $scope;
});