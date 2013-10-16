Shepherd.MetadatumField = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    type: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    allowedValuesList: DS.belongsTo('Shepherd.MetadatumValuesList', { embedded: true }),
	links : DS.hasMany('Shepherd.Link')
});
