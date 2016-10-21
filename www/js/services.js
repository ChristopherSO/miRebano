﻿angular.module('starter.services', ['starter.models'])

.service('PersonService', function (Person, $http) {
	
	var personsData = {};

	return {

		loadPersons: function () {
			return $http.get('json/persons.json').then(function (response) {
				personsData = response.data;
			});
		},

		getPersons: function () {
			var persons = [];
			personsData.forEach(function (person) {
				persons.push(
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
			})
			return persons;
		},

		getPerson: function (personId) {
			for (i = 0; i < personsData.length; i++) {
				if (personsData[i].id == personId) {
					var person = personsData[i];
					return new Person(
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
					);
				}
			}
		}

	}
})

.service('EventService', function (Event, $http) {
	
	var eventsData = [];

	return {

		loadEvents: function () {
			return $http.get('json/events.json').then(function (response) {
				eventsData = response.data;
			});
		},

		getEvents: function () {
			var events = [];
			eventsData.forEach(function (event) {
				events.push(
					new Event(
						event.id,
						event.id_persona,
						//PersonService.getPerson(event.id_persona),
						event.tipo,
						event.icono,
						event.dia,
						event.mes,
						event.anio
					)
				);
			});
			return events;
		},

		getPersonsEvents: function (personId) {
			var personsEvents = [];
			eventsData.forEach(function (event) {
				if (event.id_persona == personId) {
					personsEvents.push(
						new Event(
							event.id,
							event.id_persona,
							//PersonService.getPerson(event.id_persona),
							event.tipo,
							event.icono,
							event.dia,
							event.mes,
							event.anio
						)
					);
				}
			})
			return personsEvents;
		}
	}
})

.service('ActivityService', function (Activity, $http) {
	
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

.service('AttendanceService', function (PersonService, $http) {
	
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
