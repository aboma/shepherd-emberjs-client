Vilio.MetadataValuesList = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    created_at : DS.attr('string'),
    updated_at : DS.attr('string'),
    metadata_list_values : DS.hasMany('Vilio.MetadataListValue'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
