Shepherd.Metadatum = DS.Model.extend({
    asset: DS.belongsTo('asset'),
    metadatumField: DS.belongsTo('metadatumField'),
    metadatumValue: DS.attr('string')
});
