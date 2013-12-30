Shepherd.Asset = DS.Model.extend({
	name : DS.attr('string'),
	description : DS.attr('string'),
	filename : DS.attr('string'),
    createdAt : DS.attr('date'),
    updatedAt : DS.attr('date'), 
    file: DS.attr('string'),
    image: DS.attr('string'),
    thumbnail: DS.attr('string'),
	portfolios: DS.hasMany('portfolio'),
    metadata: DS.hasMany('metadatum', { async: true })
});
