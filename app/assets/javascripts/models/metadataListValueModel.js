Shepherd.MetadatumListValue = DS.Model.extend({
    value: DS.attr('string'),
    metadatumValuesList: DS.belongsTo('metadatumValuesList')
});
