Vilio.MetadataTemplateFieldSetting = DS.Model.extend({
  //  metadata_template: DS.belongsTo('Vilio.MetadataTemplate'),
    metadatumField: DS.belongsTo('Vilio.MetadatumField'),
    required: DS.attr('boolean'),
    order: DS.attr('number')
});
