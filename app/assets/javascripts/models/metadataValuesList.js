Vilio.MetadataValuesList = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    metadataListValues : DS.hasMany('Vilio.MetadataListValue'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
