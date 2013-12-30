Shepherd.Relationship = DS.Model.extend({
	asset : DS.belongsTo('asset'),
	portfolio : DS.belongsTo('portfolio'),
    createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),

    formData : null
});
