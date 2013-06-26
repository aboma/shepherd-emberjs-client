Vilio.MetadataListValue = DS.Model.extend({
    value: DS.attr('string'),
    metadata_values_list: DS.belongsTo('Vilio.MetadataValuesList')
});
