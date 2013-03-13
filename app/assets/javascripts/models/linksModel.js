// these are HATEOS links embedded in asset models
Vilio.Link = DS.Model.extend({
	rel : DS.attr('string'),
	href : DS.attr('string'),
	asset : DS.belongsTo('Vilio.Asset')
});

Vilio.Link.reopenClass({
	collectionUrl : 'links',
	resourceUrl : 'links',
	url : 'link',
	resourceName : 'link'
});