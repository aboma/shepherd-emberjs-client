Vilio.MetadataValuesList = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    field: DS.belongsTo('Vilio.MetadataField')
});

Vilio.MetadataValuesList.reopenClass({
	collectionUrl : 'metadatalists',
	resourceUrl : 'metadatalists',
	url : 'metadatalist',
	resourceName : 'metadatalist'
});
