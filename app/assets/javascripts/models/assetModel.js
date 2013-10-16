Shepherd.Asset = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	filename : DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'), 
	links : DS.hasMany('Shepherd.Link'),
	portfolios: DS.hasMany('Shepherd.Portfolio'),
    metadata: DS.hasMany('Shepherd.MetadatumValue')
});
