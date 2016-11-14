angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	//// Form data for the login modal
	//$scope.loginData = {};

	//// Create the login modal that we will use later
	//$ionicModal.fromTemplateUrl('templates/login.html', {
	//  scope: $scope
	//}).then(function(modal) {
	//  $scope.modal = modal;
	//});

	//// Triggered in the login modal to close it
	//$scope.closeLogin = function() {
	//  $scope.modal.hide();
	//};

	//// Open the login modal
	//$scope.login = function() {
	//  $scope.modal.show();
	//};

	//// Perform the login action when the user submits the login form
	//$scope.doLogin = function() {
	//  console.log('Doing login', $scope.loginData);

	//  // Simulate a login delay. Remove this and replace with your login
	//  // code if using a login system
	//  $timeout(function() {
	//    $scope.closeLogin();
	//  }, 1000);
	//};
})

.controller('EventsCtrl', function ($scope, EventService) {
	EventService.getEventsWithPersons().then(function (events) {
		$scope.events = events;
	});
	console.log(11);
	$scope.$on("$ionicView.beforeEnter", function (event, data) {
		// handle event
		console.log("Events State Params beforeEnter: ", data.stateParams);
	});
	$scope.doSomething = function () {
		console.log(new Date("2015/10/3"));
	};
})

.controller('PersonsCtrl', function ($scope, $ionicPlatform, $ionicModal, PersonService) {

	$ionicPlatform.ready(function() {
		// Initialize the database
		PersonService.initDB();
	});

	// Initialize the modal view.
	$ionicModal.fromTemplateUrl('templates/addOrEditPerson.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.showAddPersonModal = function () {
		$scope.person = PersonService.getEmptyPerson();
		$scope.action = 'Agregar';
		$scope.isAdd = true;
		$scope.modal.show();
	};

	$scope.showEditPersonModal = function (person) {
		$scope.person = person;
		$scope.action = 'Editar';
		$scope.isAdd = false;
		$scope.modal.show();
	};

	$scope.savePerson = function () {
		if ($scope.isAdd) {
			PersonService.addPerson($scope.person);
		} else {
			PersonService.updatePerson($scope.person);
		}
		$scope.modal.hide();
		$scope.person = PersonService.getEmptyPerson();
	};

	$scope.deletePerson = function () {
		PersonService.deletePerson($scope.person);
		$scope.modal.hide();
	};

	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});

	$scope.$on("$ionicView.beforeEnter", function (event, data) {
		PersonService.getAllPersons().then(function (persons) {
			$scope.persons = persons;
			console.log(persons);
		});
	});

	$scope.doSomething2 = function () {
		console.log(new Date(2015, 10, 3));
	};
})

.controller('PersonDetailsCtrl', function ($scope, $stateParams, $q, PersonService, EventService, LocationService) {
	$scope.person = PersonService.getPerson($stateParams.personId);
	console.log("$scope.person", $scope.person);
	$scope.personsEvents = EventService.getPersonsEvents($stateParams.personId);
	
	$q.all([
		LocationService.loadProvinces(),
		LocationService.loadCantons(),
		LocationService.loadDistricts(),
		LocationService.loadNeighborhoods()
	]).then(function (values) {
		$scope.personsLocation = LocationService.getLocation(
			$scope.person.province,
			$scope.person.canton,
			$scope.person.district,
			$scope.person.neighborhood
		);
	});
})

.controller('ActivitiesCtrl', function ($scope, ActivityService) {
	$scope.activities = ActivityService.getActivities();
})

.controller('AttendanceCtrl', function ($scope, $stateParams, ActivityService, AttendanceService) {
	$scope.activity = ActivityService.getActivity($stateParams.activityId);
	$scope.attendance = AttendanceService.getAttendance($stateParams.activityId);
});
