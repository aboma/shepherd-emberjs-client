Vilio.MetadataTemplate = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    //createdAt : DS.attr('string'),
    //updatedAt : DS.attr('string'),
    metadataTemplateFieldSettings: DS.hasMany('Vilio.MetadataTemplateFieldSetting'), //, { inverse: 'metadata_template' }),
	links : DS.hasMany('Vilio.Link')
});
