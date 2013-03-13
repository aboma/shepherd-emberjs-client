Vilio.Asset = DS.Model.extend({
	name : DS.attr('string'),
	file_path : DS.attr('string'),
	thumbnail_path : DS.attr('string'),
	links : DS.hasMany('Vilio.Link'),
	relationships: DS.hasMany('Vilio.Relationship')
});

Vilio.Asset.reopenClass({
	collectionUrl : 'assets',
	resourceUrl : 'assets',
	url : 'asset',
	resourceName : 'asset'
});