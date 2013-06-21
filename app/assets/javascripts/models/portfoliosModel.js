Vilio.Portfolio = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	created_at : DS.attr('string'),
	updated_at : DS.attr('string'),
	relationships: DS.hasMany('Vilio.Relationship'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
