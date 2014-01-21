App.directive('aboutSection', function ($rootScope) {
	return {
		templateUrl: 'states/about.html',
		replace: true,
		restrict: 'E',
		controller: function($scope, $element, $attrs) {

		}
	};
})