Vilio.MetadataValue = DS.Model.extend({
    metadataField: DS.belongsTo('Vilio.MetadataField'),
    metadataValue: DS.attr('string')
});
