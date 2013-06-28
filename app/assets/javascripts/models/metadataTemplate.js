Vilio.MetadataTemplate = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    created_at : DS.attr('string'),
    updated_at : DS.attr('string'),
    fields: DS.hasMany('Vilio.MetadataTemplateFieldSetting'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
