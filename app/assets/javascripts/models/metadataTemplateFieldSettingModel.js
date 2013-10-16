Shepherd.MetadataTemplateFieldSetting = DS.Model.extend({
  //  metadata_template: DS.belongsTo('Shepherd.MetadataTemplate'),
    metadatumField: DS.belongsTo('Shepherd.MetadatumField'),
    required: DS.attr('boolean'),
    order: DS.attr('number')
});
