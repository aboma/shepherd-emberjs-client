Vilio.MetadataValuesList = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    createdAt : DS.attr('string'),
    updatedAt : DS.attr('string'),
    fields : DS.hasMany('Vilio.MetadataField')
});
