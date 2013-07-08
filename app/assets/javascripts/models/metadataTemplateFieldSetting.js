Vilio.MetadataTemplateFieldSetting = DS.Model.extend({
  //  metadata_template: DS.belongsTo('Vilio.MetadataTemplate'),
    field: DS.belongsTo('Vilio.MetadataField'),
    required: DS.attr('boolean'),
    order: DS.attr('number')
});
