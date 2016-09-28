angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
	$scope.events = EventService.getEvents();
	console.log($scope.events[0]);
	$scope.doSomething = function () {
		console.log(new Date(2015,10,3));
	};
})

.controller('PersonsCtrl', function ($scope, PersonService) {
	$scope.persons = PersonService.getPersons();
	console.log($scope.persons[0].firstName);
	console.log($scope.persons[0].lastName1);
	console.log($scope.persons[0].lastName2);
	console.log($scope.persons[0].getFullName());
	$scope.doSomething2 = function () {
		console.log(new Date(2015, 10, 3));
	};
})

.factory('Person', function () {
	/**
	 * Constructor
	 */
	function Person(id, firstName, lastName1, lastName2, gender) {
		// Public properties, assigned to the instance ('this')
		this.id = id;
		this.firstName = firstName;
		this.lastName1 = lastName1;
		this.lastName2 = lastName2;
		this.gender = gender;
	}

	/**
	 * Public method, assigned to prototype
	 */
	Person.prototype.getFullName = function () {
		return this.firstName + ' ' + this.lastName1 + ' ' + this.lastName2;
	};

	/**
	 * Return the constructor function
	 */
	return Person;
})

.factory('Event', function (PersonService) {
	/**
	 * Constructor
	 */
	function Event(id, personId, type, day, month, year) {
		// Public properties, assigned to the instance ('this')
		this.id = id;
		this.person = PersonService.getPerson(personId);
		this.type = type;
		this.day = day;
		this.month = month;
		this.year = year;
	}

	/**
	 * Public method, assigned to prototype
	 */
	//Event.prototype.getPersonsFullName = function () {
	//	//console.log(PersonService.getPerson(this.person.id).getFullName());
	//	return this.person.getFullName();
	//};

	/**
	 * Public method, assigned to prototype
	 */
	Event.prototype.getDate = function () {
		var date = new Date(this.year || 0, this.month, this.day);
		return date.toDateString();
	};

	/**
	 * Return the constructor function
	 */
	return Event;
})

.service('PersonService', function (Person) {
	return {

		personsData: [
			{
				id: 1,
				nombre: 'Tonny',
				apellido1: 'Obando',
				apellido2: 'Jara',
				genero: 'M'
			},
			{
				id: 2,
				nombre: 'Hellen',
				apellido1: 'Ríos',
				apellido2: 'Araya',
				genero: 'F'
			},
			{
				id: 3,
				nombre: 'Christopher',
				apellido1: 'Suárez',
				apellido2: 'Ortíz',
				genero: 'M'
			}
		],

		getPersons: function () {
			var persons = [];
			this.personsData.forEach(function (person) {
				persons.push(
					new Person(
						person.id,
						person.nombre,
						person.apellido1,
						person.apellido2,
						person.genero
					)
				);
			})
			return persons;
		},

		getPerson: function (personId) {
			for (i = 0; i < this.personsData.length; i++) {
				if (this.personsData[i].id == personId) {
					var person = this.personsData[i];
					return new Person(
						person.id,
						person.nombre,
						person.apellido1,
						person.apellido2,
						person.genero
					);
				}
			}
		}

	}
})

.service('EventService', function (Event) {
	return {

		eventsData:  [
			{
				id: 1,
				id_persona: 2,
				tipo: 'cumpleaños',
				dia: 3,
				mes: 10,
				anio: 0
			},
			{
				id: 2,
				id_persona: 2,
				tipo: 'aniversario',
				dia: 9,
				mes: 12,
				anio: 2011
			},
			{
				id: 3,
				id_persona: 3,
				tipo: 'cumpleaños',
				dia: 15,
				mes: 2,
				anio: 83
			}
		],

		getEvents: function () {
			var events = [];
			this.eventsData.forEach(function (event) {
				events.push(
					new Event(
						event.id,
						event.id_persona,
						event.tipo,
						event.dia,
						event.mes,
						event.anio
					)
				);
			})
			return events;
		},

		getEvent: function (eventId) {
			for (i = 0; i < this.events.length; i++) {
				if (this.events[i].id == eventId) {
					return this.events[i];
				}
			}
		}
	}
});
