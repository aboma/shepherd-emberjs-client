Vilio.MetadatumValue = DS.Model.extend({
    metadatumField: DS.belongsTo('Vilio.MetadataField'),
    metadatumValue: DS.attr('string')
});
