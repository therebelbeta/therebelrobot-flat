App.directive('projectsSection', function ($rootScope) {
	return {
		templateUrl: 'states/projects.html',
		replace: true,
		restrict: 'E',
		controller: function($scope, $element, $attrs) {
			$element.find('modal').each(function(){
				$(this).modal();
			});
		}
	};
})