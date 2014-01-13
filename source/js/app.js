var App = angular.module('therebelrobot', ['ngRoute','templates']);

App.config(function ($routeProvider) {
    $routeProvider
      .when('/', { controller: 'MainCtrl'  })
      .when('/stack', { controller: 'StackCtrl'  })
      .when('/projects', { controller: 'ProjectCtrl'  })
      .when('/about', { controller: 'AboutCtrl'  })
      .when('/contact', { controller: 'ContactCtrl'  })
      .when('/404', { controller: 'ErrorCtrl'  })
      .otherwise({
        redirectTo: '/404'
      });
  });
App.run(["$rootScope", '$window', "$location", function($rootScope, $window, $location) {
  $rootScope.baseURL = $window.location.origin ? $window.location.origin : $window.location.protocol+"//"+$window.location.host;
  $rootScope.appLocation = $location.path().substring(1);
  console.log($rootScope.appLocation);
  $rootScope.$on('$locationChangeStart', function() {
    $rootScope.appLocation = $location.path().substring(1);  
  	console.log($rootScope.appLocation);
    setDevice();
  });
  angular.element($window).bind('resize', function() {
    $rootScope.$apply(function() {
  		setDevice();
  	});
  });
  jQuery('.ui.menu .popup').popup({
  	debug	: false,
		performance	: false,
		verbose : false
  });
  function setDevice(){
  	console.log('resize (6683160)');
    $rootScope.ifDesktop = (/windows|linux|os\s+[x9]|solaris|bsd/i).test(navigator.userAgent) && !(/ipod|iphone/i).test(navigator.userAgent);
    $rootScope.ifTablet = (/ipad/i).test(navigator.userAgent)||((/android/i).test(navigator.userAgent) && !(/mobile/i).test(navigator.userAgent));
    $rootScope.ifMobile = (/ipod|iphone/i).test(navigator.userAgent)|| ((/android/i).test(navigator.userAgent) && (/mobile/i).test(navigator.userAgent)) ||(!$rootScope.ifDesktop && !$rootScope.ifTablet);
    $rootScope.orientation = (jQuery(window).width() < jQuery(window).height())?'portrait':'landscape';
    $rootScope.userDevice = $rootScope.ifMobile ? 'mobile' : 'desktop';
    // $rootScope.userDevice = 'mobile';
    $rootScope.notChrome = navigator.userAgent.toLowerCase().indexOf('chrome') < 0;
    $rootScope.IE9 = navigator.userAgent.indexOf('MSIE 9') < 0;
    $rootScope.menuExpanded = ($rootScope.ifMobile || $rootScope.ifTablet) ? false : true;
  }
  setDevice();
  $rootScope.position = ['pos0','pos1','pos2','pos3','pos4','pos5'];
  $rootScope.setPosition = function(state){
    console.log(state);
    switch (state){
        case 'main':
          $rootScope.position = ['pos0','pos1','pos2','pos3','pos4','pos5'];
          break;

        case 'stack':
          $rootScope.position = ['pos-1','pos0','pos1','pos2','pos3','pos4'];
          break;
          
        case 'projects':
          $rootScope.position = ['pos-2','pos-1','pos0','pos1','pos2','pos3'];
          break;
          
        case 'about':
          $rootScope.position = ['pos-3','pos-2','pos-1','pos0','pos1','pos2'];
          break;
          
        case 'contact':
          $rootScope.position = ['pos-4','pos-3','pos-2','pos-1','pos0','pos1'];
          break;
          
        case '404':
          $rootScope.position = ['pos-5','pos-4','pos-3','pos-2','pos-1','pos0'];
          break;
    }

  };
}]);