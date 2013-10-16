Shepherd.MetadatumValuesList = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    metadatumListValues : DS.hasMany('Shepherd.MetadatumListValue'),
	links : DS.hasMany('Shepherd.Link', { embedded: 'load' })
});
