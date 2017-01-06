// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngStorage'])

.run(function($ionicPlatform,$ionicPopup,$state) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

   // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
      
                     if($state.current.name=="app"){
                        
                        $ionicPopup.confirm({
                                title: 'System warning',
                                template: 'are you sure you want to exit?'
                                 }).then(function(res) {
                                       if (res) {
                                           ionic.Platform.exitApp();
                                          }
                                    })
                                 //   navigator.app.exitApp();
                         }
                        else {
                             navigator.app.backHistory();
                         }
        
  }, 100); //Return to previous view = 100  Close side menu = 150 Dismiss modal = 200 Close action sheet = 300 Dismiss popup = 400 Dismiss loading overlay = 500.
    
})

// Ionic code modification begins

.config(function($stateProvider, $urlRouterProvider, $httpProvider,$ionicConfigProvider) {
    
    
  $httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};
    
  $ionicConfigProvider.tabs.position('top');

$stateProvider 
.state('app', {
url: '/app',
templateUrl: 'templates/login.html',
controller: 'LoginCtrl'
})

.state('aboutUs', {
url: '/aboutUs',
controller: 'aboutUsCtrl',
templateUrl: 'templates/about-us.html'
}) 

.state('verification', {
url: '/verification',
templateUrl: 'templates/verification.html',
controller: 'VerifyOTPCtrl'
})

.state('booking', {
url: '/booking',
templateUrl: 'templates/booking.html'
})

.state('bookRide', {
url: '/bookRide',
templateUrl: 'templates/book-ride.html',
controller: 'BookRideCtrl'
})

.state('bookingSts', {
url: '/bookingSts',
abstract: true,
controller: 'BookingStsTabCtrl',
templateUrl: 'templates/booking-status.html',
})
.state('bookingSts.pending', {
  cache: false,
url: '/pending/:filterId',
views: {
		  'tab-pending': 
		  {
			controller: 'BookingStsTabCtrl',
			templateUrl: 'templates/tab-pending.html'
		  }
		}
})
.state('bookingSts.confirmed', {
  cache: false,
url: '/confirmed/:filterId',
views: {
		  'tab-confirmed': 
		  {
			controller: 'BookingStsTabCtrl',
			templateUrl: 'templates/tab-confirmed.html'
		  }
		}
})

.state('bookingSts.cancelled', {
  cache: false,
url: '/cancelled/:filterId',
views: {
		  'tab-cancelled': 
		  {
			controller: 'BookingStsTabCtrl',
			templateUrl: 'templates/tab-cancelled.html'
		  }
		}
})

.state('myRides', {
url: '/myRides',
abstract: true,
controller: 'myRidesCtrl',
templateUrl: 'templates/my-rides.html',
})
.state('myRides.upcoming', {
  cache: false,
url: '/upcoming',
views: {
		  'tab-upcoming': 
		  {
			controller: 'UpcomingCtrl',
			templateUrl: 'templates/tab-upcoming.html'
		  }
		}
})
.state('myRides.completed', {
  cache: false,
url: '/completed',
views: {
		  'tab-completed': 
		  {
			controller: 'CompletedCtrl',
			templateUrl: 'templates/tab-completed.html'
		  }
		}
}); 

// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app');
});

