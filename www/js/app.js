// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	// for form inputs)
	  if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
	  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	  cordova.plugins.Keyboard.disableScroll(true);

	}
	if (window.StatusBar) {
	  // org.apache.cordova.statusbar required
	  StatusBar.styleDefault();
	}
  });
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.events', {
		url: '/events',
		views: {
			'menuContent': {
				templateUrl: 'templates/events.html',
				controller: 'EventsCtrl'
			}
		},
		resolve: {
			loadPersons: function (PersonService) {
				return PersonService.loadPersons().then(function () {
					console.log("1:", "Terminó de cargar la lista de personas");
				});
			},
			loadEvents: function (EventService) {
				return EventService.loadEvents().then(function () {
					console.log("2:", "Terminó de cargar la lista de eventos");
				});
			}
		}
	})

	.state('app.persons', {
		url: '/persons',
		views: {
			'menuContent': {
				templateUrl: 'templates/persons.html',
				controller: 'PersonsCtrl'
			}
		},
		resolve: {
			loadPersons: function (PersonService) {
				return PersonService.loadPersons().then(function () {
					console.log("1:", "Terminó de cargar la lista de personas");
				});
			}
		}
	})

	.state('app.person', {
		url: '/persons/:personId',
		views: {
			'menuContent': {
				templateUrl: 'templates/personDetails.html',
				controller: 'PersonDetailsCtrl'
			}
		},
		resolve: {
			loadPersons: function (PersonService) {
				return PersonService.loadPersons().then(function () {
					console.log("1:", "Terminó de cargar la lista de personas");
				});
			},
			loadEvents: function (EventService) {
				return EventService.loadEvents().then(function () {
					console.log("2:", "Terminó de cargar la lista de eventos");
				});
			},
			loadProvinces: function (LocationService) {
				return LocationService.loadProvinces().then(function () {
					console.log("1:", "loadProvinces");
				});
			},
			loadCantons: function (LocationService) {
				return LocationService.loadCantons().then(function () {
					console.log("2:", "loadCantons");
				});
			},
			loadDistricts: function (LocationService) {
				return LocationService.loadDistricts().then(function () {
					console.log("3:", "loadDistricts");
				});
			},
			loadNeighborhoods: function (LocationService) {
				return LocationService.loadNeighborhoods().then(function () {
					console.log("4:", "loadNeighborhoods");
				});
			}
		}
	})

	.state('app.activities', {
		url: '/activities',
		views: {
			'menuContent': {
				templateUrl: 'templates/activities.html',
				controller: 'ActivitiesCtrl'
			}
		},
		resolve: {
			loadActivities: function (ActivityService) {
				return ActivityService.loadActivities().then(function () {
					console.log("3:", "Terminó de cargar la lista de actividades");
				});
			}
		}
	})

	.state('app.attendance', {
		url: '/attendance/:activityId',
		views: {
			'menuContent': {
				templateUrl: 'templates/attendance.html',
				controller: 'AttendanceCtrl'
			}
		},
		resolve: {
			loadAttendance: function (AttendanceService) {
				return AttendanceService.loadAttendance().then(function () {
					console.log("4:", "Terminó de cargar la lista de asistencia");
				});
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/events');
})

.config(function ($ionicConfigProvider) {
	$ionicConfigProvider.views.maxCache(5);

	// Change back button text
	$ionicConfigProvider.backButton.text('Atrás');
});
