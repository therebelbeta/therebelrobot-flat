var App = angular.module('therebelrobot', ['ngRoute']);

App.config(function ($routeProvider) {
	$routeProvider
	.when('/',					{  templateUrl: 'templates/states/main.html',			controller: 'MainCtrl'			})
	.when('/stack',			{  templateUrl: 'templates/states/stack.html',			controller: 'StackCtrl'			})
	.when('/projects',	{  templateUrl: 'templates/states/projects.html', controller: 'ProjectsCtrl'	})
	.when('/about',			{  templateUrl: 'templates/states/about.html',			controller: 'AboutCtrl'			})
	.when('/cv',				{  templateUrl: 'templates/states/cv.html',			controller: 'CvCtrl'			})
	.when('/contact',		{  templateUrl: 'templates/states/contact.html',	controller: 'ContactCtrl'		})
	.otherwise({
		redirectTo: '/'
	});
});
App.run(function ($rootScope, $location, $window) {
	var appState = $location.path().substring(1);
	if (appState === ''){
		appState = 'main';
	}
	$rootScope.appState = appState;
	$rootScope.$on('$routeChangeSuccess', function() {
		var appState = $location.path().substring(1);
		if (appState === ''){
			appState = 'main';
		}
		$rootScope.appState = appState;
	});
	$rootScope.device = (/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent) ? 'mobile' : 'desktop';
	$rootScope.setApp = function(state){
		switch (state){
			case 'main':
			window.location.hash = "/";
			return;
			case 'stack':
			window.location.hash = "/stack";
			return;
			case 'projects':
			window.location.hash = "/projects";
			return;
			case 'about':
			window.location.hash = "/about";
			return;
			case 'cv':
			window.location.hash = "/cv";
			return;
			case 'contact':
			window.location.hash = "/contact";
			return;
		} 
	};

	$(document).ready(function(){
		$('body').removeClass('preload');
	});
}); 