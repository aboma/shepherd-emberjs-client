Shepherd.MetadataTemplate = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    metadataTemplateFieldSettings: DS.hasMany('Shepherd.MetadataTemplateFieldSetting'), //, { inverse: 'metadata_template' }),
	links : DS.hasMany('Shepherd.Link')
});
