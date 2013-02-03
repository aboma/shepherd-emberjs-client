Luxin.Relationship = DS.Model.extend({
	asset_id : DS.belongsTo('Luxin.Asset'),
	portfolio : DS.belongsTo('Luxin.Portfolio'),
	created_at : DS.attr('string'),
	updated_at : DS.attr('string')
});

Luxin.Relationship.reopenClass = ({
	collectionUrl: 'relationships',
	resourceUrl: 'relationships',
	url: 'relationship',
	resourcename: 'relationship'	
});