Vilio.MetadataField = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    type: DS.attr('string')
//    allowedValuesList: DS.belongsTo('Vilio.MetadataValuesList')
});
