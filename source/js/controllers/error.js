App.directive('errorSection', function ($rootScope) {
	return {
		templateUrl: 'states/error.html',
		replace: true,
		restrict: 'E',
		controller: function($scope, $element, $attrs) {

		}
	};
})