Shepherd.Portfolio = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),
	relationships: DS.hasMany('Shepherd.Relationship'),
    metadataTemplate: DS.belongsTo('Shepherd.MetadataTemplate'),
	links : DS.hasMany('Shepherd.Link')
});
