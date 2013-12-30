Shepherd.Portfolio = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),
	relationships: DS.hasMany('relationship', { async: true }),
    metadataTemplate: DS.belongsTo('metadataTemplate')
});
