Vilio.Portfolio = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),
	relationships: DS.hasMany('Vilio.Relationship'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
