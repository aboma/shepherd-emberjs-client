Vilio.MetadataField = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    type: DS.attr('string'),
 	created_at : DS.attr('string'),
	updated_at : DS.attr('string'),
    allowedValuesList: DS.belongsTo('Vilio.MetadataValuesList')
});

Vilio.MetadataField.reopenClass({
	collectionUrl : 'fields',
	resourceUrl : 'fields',
	url : 'field',
	resourceName : 'field'
});
