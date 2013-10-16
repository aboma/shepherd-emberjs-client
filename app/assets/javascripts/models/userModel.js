Shepherd.User = DS.Model.extend({
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    password: DS.attr('string'),
    passwordConfirmation: DS.attr('string'),
    lastSignInAt: DS.attr('date'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
	links : DS.hasMany('Shepherd.Link'),

    nameFormatLastFirst: function() {
        return this.get('lastName') + ', ' + this.get('firstName');
    }.property('lastName', 'firstName'),

    nameFormatFirstLast: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('lastName', 'firstName')
});
