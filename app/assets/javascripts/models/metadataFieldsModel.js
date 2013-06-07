Vilio.MetadataField = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    type: DS.attr('string'),
 	created_at : DS.attr('string'),
	updated_at : DS.attr('string'),
    allowedValuesList: DS.belongsTo('Vilio.MetadataValuesList', { embedded: true }),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
