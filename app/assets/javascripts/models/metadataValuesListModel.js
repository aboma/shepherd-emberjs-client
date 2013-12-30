Shepherd.MetadatumValuesList = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'),
    metadatumListValues : DS.hasMany('metadatumListValue')
});
