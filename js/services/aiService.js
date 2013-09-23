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
  storeBookmark: function(actionItem){
      aiService.bookmarks.push(actionItem);
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
    // var containsBookmark = _.indexOf(aiService.bookmarks, actionItem.LISTITEMNUM)!==-1;
    var containsBookmark = _.any(aiService.bookmarks, function(aiObj){return aiObj.LISTITEMNUM == actionItem.LISTITEMNUM});

    if (containsBookmark == true){
       console.log("The bookmark is already there");
      aiService.removeBookmark(actionItem);
      actionItem.bookmarked = false;
    }
    else if(containsBookmark == false) {
      console.log("The bookmark is NOT already there");
       aiService.storeBookmark(actionItem);
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