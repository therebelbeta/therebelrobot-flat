App.controller('CvCtrl', function ($scope, $routeParams) {
	$scope.editorOptions = {
		lineWrapping : true,
		lineNumbers: true,
		readOnly: 'nocursor',
		mode: 'xml',
	};
});