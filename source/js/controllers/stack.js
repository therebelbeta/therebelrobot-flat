App.directive('stackSection', function ($rootScope) {
	return {
		templateUrl: 'states/stack.html',
		replace: true,
		restrict: 'E',
		controller: function($scope, $element, $attrs) {
			$element.find('modal').each(function(){
				$(this).modal();
			});
		}
	};
})