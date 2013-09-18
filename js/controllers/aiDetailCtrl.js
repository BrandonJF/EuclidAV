euclidAV.controller('aiDetailCtrl',['$scope','$routeParams','aiService',function($scope,$routeParams, aiService){

	$scope.test = "This is the aiDetailCtrl";
	$scope.ai = {
		"LISTITEMNUM" : $routeParams.aiNumber,
		"details" : ""
	}

	aiService.getAiDetails($scope.ai.LISTITEMNUM).success(function(data){
		$scope.ai.details = data;
	});


}]);