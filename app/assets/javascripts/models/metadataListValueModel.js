Vilio.MetadatumListValue = DS.Model.extend({
    value: DS.attr('string'),
   // metadata_values_list: DS.belongsTo('Vilio.MetadatumValuesList')
    metadatumValuesList: DS.belongsTo('Vilio.MetadatumValuesList')
});
