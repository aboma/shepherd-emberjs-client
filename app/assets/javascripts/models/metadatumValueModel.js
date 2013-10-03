Vilio.MetadatumValue = DS.Model.extend({
    metadatumField: DS.belongsTo('Vilio.MetadatumField'),
    metadatumValue: DS.attr('string')
});
