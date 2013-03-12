// these are HATEOS links embedded in asset models
Luxin.Link = DS.Model.extend({
	rel : DS.attr('string'),
	href : DS.attr('string'),
	asset : DS.belongsTo('Luxin.Asset')
});

Luxin.Link.reopenClass({
	collectionUrl : 'links',
	resourceUrl : 'links',
	url : 'link',
	resourceName : 'link'
});