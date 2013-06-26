Vilio.RelationshipsRoute = Ember.Route.extend({
	// get relationships for portfolio; these contain 
	// portfolio <-> asset relationship
	model: function() {
		var id = this.modelFor('portfolio').get('id');
		return Vilio.Relationship.find({ portfolio_id: id });
	},
	renderTemplate: function() {
		this.render('relationships', {
			into: 'portfolios',
			outlet: 'detail'
		})
	}
});

Vilio.RelationshipsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('relationships');
	},
	renderTemplate: function() {
		this.render('relationships.index', {
			into: 'relationships'
		});
	}
});

Vilio.RelationshipsNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		this.controllerFor(this.routeName).startEditing(transaction);
		return transaction.createRecord(Vilio.Asset, {});
	},
	renderTemplate: function() {
		this.render('relationships.new', {
			into: 'relationships'
		});
	}
});
