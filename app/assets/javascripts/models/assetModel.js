Vilio.Asset = DS.Model.extend({
	name : DS.attr('string'),
	file_path : DS.attr('string'),
	thumbnail_path : DS.attr('string'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' }),
	relationships: DS.hasMany('Vilio.Relationship', { embedded: 'load' })
});

Vilio.Asset.reopenClass({
	collectionUrl : 'assets',
	resourceUrl : 'assets',
	url : 'asset',
	resourceName : 'asset'
});