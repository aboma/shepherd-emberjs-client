Luxin.Asset = DS.Model.extend({
	name : DS.attr('string'),
	file_path : DS.attr('string'),
	thumbnail_path : DS.attr('string'),
	links : DS.hasMany('Luxin.Link'),
	relationships: DS.hasMany('Luxin.Relationship')
});

Luxin.Asset.reopenClass({
	collectionUrl : 'assets',
	resourceUrl : 'assets',
	url : 'asset',
	resourceName : 'asset'
});