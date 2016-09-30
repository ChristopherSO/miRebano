angular.module('starter.models', [])

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
	 * Public method, assigned to prototype
	 */
	Person.prototype.getGender = function () {
		var gender;
		if (this.gender == 'M') {
			gender = "Masculino";
		} else if (this.gender == 'F') {
			gender = "Femenino";
		} else {
			gender = "No indicado"
		}
		return gender;
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
		return new Date(this.year || 0, this.month-1, this.day);
	};

	/**
	 * Public method, assigned to prototype
	 */
	Event.prototype.getYearsToMeet = function () {
		return (new Date()).getFullYear() - this.year;
	};

	/**
	 * Return the constructor function
	 */
	return Event;
});
