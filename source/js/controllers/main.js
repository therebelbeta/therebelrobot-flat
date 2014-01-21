App.directive('mainSection', function ($rootScope) {
	return {
		templateUrl: 'states/main.html',
		replace: true,
		restrict: 'E',
		controller: function($scope, $element, $attrs) {

		}
	};
})