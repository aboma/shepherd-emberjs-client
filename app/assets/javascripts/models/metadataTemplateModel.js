Shepherd.MetadataTemplate = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    metadataTemplateFieldSettings: DS.hasMany('metadataTemplateFieldSetting') //, { inverse: 'metadata_template' }),
});
