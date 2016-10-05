angular.module('starter.services', ['starter.models'])

.service('PersonService', function (Person) {
	return {

		personsData: [
			{
				id: 1,
				nombre: 'Tonny',
				apellido1: 'Obando',
				apellido2: 'Jara',
				genero: 'M',
				foto: "Tonny.png"
			},
			{
				id: 2,
				nombre: 'Hellen',
				apellido1: 'Ríos',
				apellido2: 'Araya',
				genero: 'F',
				foto: "Hellen.png"
			},
			{
				id: 3,
				nombre: 'Christopher',
				apellido1: 'Suárez',
				apellido2: 'Ortíz',
				genero: 'M',
				foto: "Christopher.png"
			},
			{
				id: 4,
				nombre: 'Ester',
				apellido1: 'Salas',
				apellido2: 'Sánchez',
				genero: 'F',
				foto: "Ester.png"
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
						person.genero,
						person.foto
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
						person.genero,
						person.foto
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
				dia: 3,
				mes: 10,
				anio: 0
			},
			{
				id: 2,
				id_persona: 2,
				tipo: 'aniversario de bodas',
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
				anio: 1983
			},
			{
				id: 4,
				id_persona: 4,
				tipo: 'cumpleaños',
				dia: 25,
				mes: 6,
				anio: 1994
			},
			{
				id: 5,
				id_persona: 1,
				tipo: 'cumpleaños',
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
						event.tipo,
						event.dia,
						event.mes,
						event.anio
					)
				);
			})
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
							event.tipo,
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
});
