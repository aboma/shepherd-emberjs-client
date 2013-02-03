Luxin.Portfolio = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	created_at : DS.attr('string'),
	updated_at : DS.attr('string'),
	//assets : DS.hasMany('Luxin.Asset', { embbeded: false })
});

Luxin.Portfolio.reopenClass({
	collectionUrl: 'portfolios',
	resourceUrl: 'portfolios',
	url: 'portfolio',
	resourceName: 'portfolio'
});