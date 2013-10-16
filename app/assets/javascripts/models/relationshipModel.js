Shepherd.Relationship = DS.Model.extend({
	asset : DS.belongsTo('Shepherd.Asset'),
	portfolio : DS.belongsTo('Shepherd.Portfolio'),
	createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),
	links : DS.hasMany('Shepherd.Link', { embedded: 'load' }),

    formData : null
});
