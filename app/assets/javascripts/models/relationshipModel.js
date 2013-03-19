Vilio.Relationship = DS.Model.extend({
	asset : DS.belongsTo('Vilio.Asset'),
	portfolio : DS.belongsTo('Vilio.Portfolio'),
	created_at : DS.attr('string'),
	updated_at : DS.attr('string')
});

Vilio.Relationship.reopenClass({
	collectionUrl: 'relationships',
	resourceUrl: 'relationships',
	url: 'relationship',
	resourcename: 'relationship'	
});