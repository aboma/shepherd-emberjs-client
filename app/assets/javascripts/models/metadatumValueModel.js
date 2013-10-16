Shepherd.MetadatumValue = DS.Model.extend({
    metadatumField: DS.belongsTo('Shepherd.MetadatumField'),
    metadatumValue: DS.attr('string')
});
