euclidAV.controller('aiDetailCtrl',['$scope','$routeParams','aiService',function($scope,$routeParams, aiService){

	$scope.test = "This is the aiDetailCtrl";
	$scope.ai = {
		"LISTITEMNUM" : $routeParams.aiNumber,
		"details" : "Loading...."
	}

	aiService.getAiDetails($scope.ai.LISTITEMNUM).success(function(data){
		var note = $(data);
		$("#details").html(note);
		$scope.ai.details = note;
		$scope.modifyDetails();
	});

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
				//console.log(entireNote);
			}

			 var headerText = $noteHeader.text();
			 headerText = headerText.substring(headerText.indexOf("by") + 3);
			 console.log(headerText);
			 console.log(noteHeader);
			$noteHeader.html(headerText);
			$noteHeader.prepend("<i class='icon-user'></i>");
		});

		

		

	}


}]);