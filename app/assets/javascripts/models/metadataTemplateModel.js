Vilio.MetadataTemplate = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    metadataTemplateFieldSettings: DS.hasMany('Vilio.MetadataTemplateFieldSetting'), //, { inverse: 'metadata_template' }),
	links : DS.hasMany('Vilio.Link')
});
