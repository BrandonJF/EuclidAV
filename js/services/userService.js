euclidAV.factory("userService", function($http,$q, localStorageService){


  var userService =  { 
   //deffered : $q.defer(),
   //gettingUsername: this.deffered.promise,
   //userId : "BJOHNFRESO",

   memberDllBaseUrl:"https://www.euclidtechnology.com/cvweb/cgi-bin/memberdll.dll/info?",

   getUsername: function (customercd) {
     console.log("getUsername Called for.", customercd);
     return $http({
      url: userService.memberDllBaseUrl,
      method: 'GET',
      params: {
        "WRP": "userinfo_json.json",
        "WMT": "none",
        "CUSTOMERCD": customercd
      }
    });
   }
};//end userService Object
return userService;

});