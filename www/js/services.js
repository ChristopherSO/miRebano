angular.module('starter.services', ['starter.models'])

.service('PersonService', function (Person, $http) {

	var personsData = {};

	$http.get('json/persons.json').then(function (response) {
		personsData = response.data;
	});

	return {

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

.service('EventService', function (Event) {

	var eventsData = [
			{
				id: 1,
				id_persona: 2,
				tipo: 'cumpleaños',
				icono: 'icon-birthday-cake',
				dia: 3,
				mes: 10,
				anio: 0
			},
			{
				id: 2,
				id_persona: 2,
				tipo: 'aniversario de bodas',
				icono: 'icon-interlocking-rings',
				dia: 9,
				mes: 12,
				anio: 2011
			},
			{
				id: 3,
				id_persona: 3,
				tipo: 'cumpleaños',
				icono: 'icon-birthday-cake',
				dia: 15,
				mes: 2,
				anio: 1983
			},
			{
				id: 4,
				id_persona: 4,
				tipo: 'cumpleaños',
				icono: 'icon-birthday-cake',
				dia: 25,
				mes: 6,
				anio: 1994
			},
			{
				id: 5,
				id_persona: 1,
				tipo: 'cumpleaños',
				icono: 'icon-birthday-cake',
				dia: 9,
				mes: 12,
				anio: 1989
			}
	];

	return {

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

.service('ActivityService', function (Activity) {

	var activitiesData = [ // fecha en yyyy/m/d
			{
				id: 1,
				fecha: "2016/10/1" // sábado
			},
			{
				id: 2,
				fecha: "2016/10/2" // domingo
			},
			{
				id: 3,
				fecha: "2016/10/4" // martes
			},
			{
				id: 4,
				fecha: "2016/10/6" // jueves
			}
	];

	return {

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

.service('AttendanceService', function (PersonService) {

	var attendanceData = [
		{
			activity_id: 1,
			person_id: 1
		},
		{
			activity_id: 1,
			person_id: 2
		},
		{
			activity_id: 1,
			person_id: 3
		},
		{
			activity_id: 1,
			person_id: 4
		},
		{
			activity_id: 2,
			person_id: 2
		},
		{
			activity_id: 2,
			person_id: 3
		},
		{
			activity_id: 2,
			person_id: 4
		},
		{
			activity_id: 3,
			person_id: 1
		},
		{
			activity_id: 3,
			person_id: 4
		},
		{
			activity_id: 4,
			person_id: 1
		},
		{
			activity_id: 4,
			person_id: 2
		},
		{
			activity_id: 4,
			person_id: 3
		}
	];

	return {

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

	$http.get('json/provincias.json').then(function (response) {
		provinces = response.data;
	});

	$http.get('json/cantones.json').then(function (response) {
		cantons = response.data;
	});

	$http.get('json/distritos.json').then(function (response) {
		districts = response.data;
	});

	$http.get('json/barrios.json').then(function (response) {
		neighborhoods = response.data;
	});

	return {

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
