Vilio.Relationship = DS.Model.extend({
	asset : DS.belongsTo('Vilio.Asset'),
	portfolio : DS.belongsTo('Vilio.Portfolio'),
	createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),
	links : DS.hasMany('Vilio.Link', { embedded: 'load' })
});
