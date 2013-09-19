euclidAV.factory("aiService", function($http){
var actionItemDllBaseUrl = "https://www.euclidtechnology.com/cvweb/cgi-bin/actionitemsdll.dll/list?";
  var aiService =  { 
    getUserAis: function () {
    return $http({
      url: actionItemDllBaseUrl,
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
   }

};//end aiService Object
return aiService;

});