Vilio.MetadatumValuesList = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    metadatumListValues : DS.hasMany('Vilio.MetadatumListValue'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
