euclidAV.factory("aiService", function($http, localStorageService){
  var aiService =  { 
    actionItemDllBaseUrl:"https://www.euclidtechnology.com/cvweb/cgi-bin/actionitemsdll.dll/list?",
    bookmarks: localStorageService.get('userBookmarks')||[],
    getUserAis: function () {
    return $http({
      url: aiService.actionItemDllBaseUrl,
      method: 'GET',
      params: {
        "ACTIONASSIGNEDTOCD": userId,
        "ACTIONPRIORITY": "",
        "ACTIONSTT": "Out-Standing",
        "ACTIONSUBJECTCD": "",
        "ACTIONTYPE": "",
        "RANGE": "1/10",
        "SORT": "LISTITEMNUM DESC",
        "WBP": "ai_list_JSON.json",
        "WHP": "ai_list_header_JSON.json",
        "wmt": "none"
      }
    });

  },
   getAiDetails: function (aiNumber) {
   	return $http({
      url: "https://www.euclidtechnology.com/cvweb/cgi-bin/actionitemsdll.dll/info?",
      method: 'GET',
      params: {
        "LISTITEMNUM":aiNumber,
		"RESPONSEPAGE":"actionNote.htm",
		"WMT":"none"		
      }
    });
   },

   getBookmarks: function(){
    return aiService.bookmarks;
   },
  storeBookmark: function(aiNumber){
      aiService.bookmarks.push(aiNumber);
     localStorageService.add('userBookmarks',aiService.bookmarks);
     console.log(aiService.bookmarks);
  },

   removeBookmark: function(aiNumber){
      aiService.bookmarks = _.without(aiService.bookmarks,aiNumber);
     localStorageService.add('userBookmarks',aiService.bookmarks);
  },

  toggleBookmark: function(actionItem){
    //console.log(_.indexOf(bookmarks, actionItem.LISTITEMNUM)!==-1);
    console.log("Toggling bookmark item");
    var containsBookmark = _.indexOf(aiService.bookmarks, actionItem.LISTITEMNUM)!==-1;

    if (containsBookmark == true){
      aiService.removeBookmark(actionItem.LISTITEMNUM);
      actionItem.bookmarked = false;
    }
    else if(containsBookmark == false) {
       aiService.storeBookmark(actionItem.LISTITEMNUM);
      actionItem.bookmarked = true;
    }
    console.log(actionItem);
    console.log("aiServBookmarks", aiService.bookmarks);
  },

  isBookmarked: function(aiNumber){
    return _.indexOf(aiService.bookmarks, aiNumber)!==-1 ? true : false;
  }

};//end aiService Object
return aiService;

});