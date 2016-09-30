angular.module('starter.services', ['starter.models'])

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
			},
			{
				id: 4,
				nombre: 'Ester',
				apellido1: 'Salas',
				apellido2: 'Sánchez',
				genero: 'F'
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

		getEvent: function (eventId) {
			for (i = 0; i < this.events.length; i++) {
				if (this.events[i].id == eventId) {
					return this.events[i];
				}
			}
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
});
