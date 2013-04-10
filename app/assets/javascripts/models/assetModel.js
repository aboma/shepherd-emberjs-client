Vilio.Asset = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	filename : DS.attr('string'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' }),
	relationships: DS.hasMany('Vilio.Relationship', { embedded: 'load' })
});

Vilio.Asset.reopenClass({
	collectionUrl : 'assets',
	resourceUrl : 'assets',
	url : 'asset',
	resourceName : 'asset'
});