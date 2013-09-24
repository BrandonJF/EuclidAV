euclidAV.controller('aiDetailCtrl',['$scope','$routeParams','aiService',function($scope,$routeParams, aiService){

	$scope.test = "This is the aiDetailCtrl";
	$scope.aiNumber = $routeParams.aiNumber;
	$scope.details = "Loading...";
	$scope.ai = {};

	aiService.getAiNotes($scope.aiNumber).success(function(data){
		var note = $(data);
		$("#details").html(note);
		if($("#details").text().length > 10){
		$scope.details = note;
		$scope.modifyDetails();
		}
		else{
			$("#details").html("Unable to find Action Item in system.")
		}
	$scope.getDetails();
	});

$scope.getDetails = function(){
	aiService.getAiDetails($scope.aiNumber).success(function(data){
		console.log("getDetailsData",data)
		 $scope.ai = aiService.modifyAi(data);
		 console.log("scope.ai", $scope.ai);
	});
}


	

	$scope.modifyDetails = function(){
		$("#details").find("*").removeAttr("style bgcolor color");
		var noteHeaders = $("#details table");
		var notesAmt = noteHeaders.length;
		$.each(noteHeaders, function(index,noteHeader){
			var $noteHeader = $(noteHeader);
			$noteHeader.addClass("noteHeader");
			if (index < notesAmt){
				var $entireNote = $noteHeader.add($noteHeader.nextUntil("table"));
				$entireNote.wrapAll( "<div class='note'></div>" );
			}
			var headerText = $noteHeader.text();
			headerText = headerText.substring(headerText.indexOf("by") + 3);
			headerTextArray = headerText.split("Time:");
			headerText = headerTextArray[0];
			var timeStamp = headerTextArray[1];
			$noteHeader.html(headerText);
			$noteHeader.prepend("<i class='icon-user'></i>");
			$noteHeader.append("<span class='timeStamp'>"+timeStamp+"</span>");
		});

		

		

	}


}]);