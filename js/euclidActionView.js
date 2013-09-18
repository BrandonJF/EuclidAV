$(function () {
	
	$("#searchAiBtn").click(function(){
		var aiNumber = $("#searchAiInput").val();
		searchAi(aiNumber);})


	function searchAi(aiNumber){
		console.log("Firing AI search.");
		$("#aiContainer").load("https://www.euclidtechnology.com/cvweb/cgi-bin/actionitemsdll.dll/info",{
			"LISTITEMNUM":aiNumber,
			"RESPONSEPAGE":"AI_UPDATE_ADMIN.HTM",
			"WMT":"none"		
		});
		
	}

	$("#topNavBrowser").click(function(){
		console.log("Firing AI search.");
		chrome.tabs.create({
			"url":"https://www.euclidtechnology.com/support/myactionitems.aspx"
		});
	});

	$("body").on("click", ".aiNumberDiv",function(e){
		var div = $(e.target);
		div.prev(".aiOptionsDiv").toggleClass("optionsExp");
	});

	// $("#aiContainer").on("hover", ".aiNumberDiv",function(e){
	// 	var div = $(e.target);
	// 	alert("test");
	// 	var bgColor = div.prev(".aiOptionsDiv").css("backgroundColor");
	// 	if(e.type == "mouseenter") {
 //    		div.prev(".aiOptionsDiv").css({"backgroundColor":"#36A2D7"});
 //  		}
 //  		if(e.type == "mouseleave") {
 //    		div.prev(".aiOptionsDiv").css({"backgroundColor":bgColor});
 //  		}
		
	// });

	$("body").on("mouseenter", ".aiNumberDiv",function(e){
		var div = $(e.target);
		div.prev(".aiOptionsDiv").toggleClass("highlighted");
	});
	$("body").on("mouseleave", ".aiNumberDiv",function(e){
		var div = $(e.target);
		div.prev(".aiOptionsDiv").toggleClass("highlighted");
	});



}); //end ready