Shepherd.MetadatumListValue = DS.Model.extend({
    value: DS.attr('string'),
   // metadata_values_list: DS.belongsTo('Shepherd.MetadatumValuesList')
    metadatumValuesList: DS.belongsTo('Shepherd.MetadatumValuesList')
});
