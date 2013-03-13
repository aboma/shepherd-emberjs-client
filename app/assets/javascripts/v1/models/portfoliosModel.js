Vilio.Portfolio = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	created_at : DS.attr('string'),
	updated_at : DS.attr('string'),
	relationships: DS.hasMany('Vilio.Relationship')
	//assets : DS.hasMany('Vilio.Asset', { embbeded: false })
});

Vilio.Portfolio.reopenClass({
	collectionUrl: 'portfolios',
	resourceUrl: 'portfolios',
	url: 'portfolio',
	resourceName: 'portfolio'
});