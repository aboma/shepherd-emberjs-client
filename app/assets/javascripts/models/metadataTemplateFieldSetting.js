Vilio.MetadataTemplateFieldSetting = DS.Model.extend({
    field: DS.belongsTo('Vilio.MetadataField'),
    required: DS.attr('boolean'),
    index: DS.attr('integer')
});
