angular.module('starter.services', ['starter.models'])

.service('PersonService', function (Person, $q, Loki) {

	var db;
	var persons;

	return {

		initDB: function () {
			var adapter = new LokiCordovaFSAdapter({ "prefix": "loki" });
			db = new Loki('personsDB', { adapter: adapter });
			console.log("db", db);
		},

		getAllPersons: function () {        
			return $q(function (resolve, reject) {
				var options = {};
				console.log("db", db);
				db.loadDatabase(options, function () {
					persons = db.getCollection('persons');

					if (!persons) {
						persons = db.addCollection('persons');
					}

					resolve(persons.data);
				});
			});
		},

		addPerson: function (person) {  
			persons.insert(person);
			db.saveDatabase();
		},

		updatePerson: function (person) {  
			persons.update(person);
		},

		deletePerson: function (person) {  
			persons.remove(person);
		},

		getPersons: function () {
			return $http.get('json/persons.json').then(function (response) {
				global.persons = [];
				response.data.forEach(function (person) {
					global.persons.push(
						new Person(
							person.id,
							person.nombre,
							person.apellido1,
							person.apellido2,
							person.genero,
							person.foto,
							person.miembroNivel,
							person.provincia,
							person.canton,
							person.distrito,
							person.barrio
						)
					);
				});
				return global.persons;
			});
		},

		getPerson: function (personId) {
			console.log("global.persons", global.persons);
			for (i = 0; i < global.persons.length; i++) {
				if (global.persons[i].id == personId) {
					return global.persons[i];
				}
			}
		},

		getEmptyPerson: function () {
			console.log("getEmptyPerson");
			return new Person();
		}

	}
})

.service('EventService', function ($http, $q, Event, Person) {

	return {

		getEvents: function () {
			return $http.get('json/events.json').then(function (response) {
				global.events = [];
				response.data.forEach(function (event) {
					global.events.push(
						new Event(
							event.id,
							event.id_persona,
							event.tipo,
							event.icono,
							event.dia,
							event.mes,
							event.anio
						)
					);
				});
				return global.events;
			});

		},

		getEventsWithPersons: function () {
			var d = $q.defer();

			$http.get('json/events.json').then(function successCallback(eventsResponse) {
				$http.get('json/persons.json').then(function (personsResponse) {
					global.events = [];
					eventsResponse.data.forEach(function (eventData) {
						var person = {};
						for (i = 0; i < personsResponse.data.length; i++) {
							if (personsResponse.data[i].id == eventData.id_persona) {
								person = new Person(
									personsResponse.data[i].id,
									personsResponse.data[i].nombre,
									personsResponse.data[i].apellido1,
									personsResponse.data[i].apellido2,
									personsResponse.data[i].genero,
									personsResponse.data[i].foto,
									personsResponse.data[i].miembroNivel,
									personsResponse.data[i].provincia,
									personsResponse.data[i].canton,
									personsResponse.data[i].distrito,
									personsResponse.data[i].barrio
								)
							}
						}
						global.events.push(
							new Event(
								eventData.id,
								eventData.id_persona,
								person,
								eventData.tipo,
								eventData.icono,
								eventData.dia,
								eventData.mes,
								eventData.anio
							)
						);
					});
					d.resolve(global.events);
				}, function errorCallback(personsResponse) {
					d.reject();
				});
			}, function errorCallback(eventsResponse) {
				d.reject();
			});

			return d.promise;
		},

		getPersonsEvents: function (personId) {
			var personsEvents = [];
			global.events.forEach(function (event) {
				if (event.personId == personId) {
					personsEvents.push(event);
				}
			})
			return personsEvents;
		}
	}
})

.service('ActivityService', function ($http, Activity) {
	
	var activitiesData = [];  // fecha en yyyy/m/d

	return {

		loadActivities: function () {
			return $http.get('json/activities.json').then(function (response) {
				activitiesData = response.data;
			});
		},

		getActivities: function () {
			var activities = [];
			activitiesData.forEach(function (activity) {
				activities.push(
					new Activity(
						activity.id,
						activity.fecha
					)
				);
			})
			return activities;
		},

		getActivity: function (activityId) {
			for (i = 0; i < activitiesData.length; i++) {
				if (activitiesData[i].id == activityId) {
					return new Activity(
						activitiesData[i].id,
						activitiesData[i].fecha
					);
				}
			}
		}
	}
})

.service('AttendanceService', function ($http, PersonService) {
	
	var attendanceData = [];

	return {

		loadAttendance: function () {
			return $http.get('json/attendance.json').then(function (response) {
				attendanceData = response.data;
			});
		},

		getAttendance: function (activity_id) {
			var persons = [];
			attendanceData.forEach(function (item) {
				if (item.activity_id == activity_id) {
					var person = PersonService.getPerson(item.person_id);
					persons.push(person);
				}
			})
			return persons;
		}
	}
})

.service('LocationService', function ($http) {
	
	var provinces = {};
	var cantons = {};
	var districts = {};
	var neighborhoods = {};

	return {

		loadProvinces: function () {
			return $http.get('json/provincias.json').then(function (response) {
				provinces = response.data;
			});
		},

		loadCantons: function () {
			return $http.get('json/cantones.json').then(function (response) {
				cantons = response.data;
			});
		},

		loadDistricts: function () {
			return $http.get('json/distritos.json').then(function (response) {
				districts = response.data;
			});
		},

		loadNeighborhoods: function () {
			return $http.get('json/barrios.json').then(function (response) {
				neighborhoods = response.data;
			});
		},

		getProvince: function (province_id) {
			return provinces[province_id];
		},

		getCanton: function (province_id, canton_id) {
			return cantons[province_id][canton_id];
		},

		getProvince: function (province_id, canton_id, district_id) {
			return districts[province_id][canton_id][district_id];
		},

		getNeighborhood: function (province_id, canton_id, district_id, neighborhood_id) {
			return districts[province_id][canton_id][district_id][neighborhood_id];
		},

		getLocation: function (province_id, canton_id, district_id, neighborhood_id) {

			var location = "";

			if (province_id != 0) {
				location = provinces[province_id];
				if (canton_id != 0) {
					location += ", "
						+ cantons[province_id][canton_id];
					if (district_id != 0) {
						if (district_id != 1) {
							location += ", "
								+ districts[province_id][canton_id][district_id];
						}
						if (neighborhood_id != 0) {
							location += ", "
								+ neighborhoods[province_id][canton_id][district_id][neighborhood_id];
						}
					}
				}
			} else {
				location += "Pendiente de registrar";
			}
			
			return location;
		}
	};
});
