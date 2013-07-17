Vilio.RelationshipsRoute = Ember.Route.extend({
	// get relationships for portfolio; these contain 
	// portfolio <-> asset relationship
	renderTemplate: function() {
		this.render('relationships', {
			into: 'portfolios',
			outlet: 'detail'
		})
	}
});

Vilio.RelationshipsIndexRoute = Ember.Route.extend({
    model: function() {
		var id = this.modelFor('portfolio').get('id');
		return Vilio.Relationship.find({ portfolio_id: id });
	},
	renderTemplate: function() {
		this.render('relationships.index', {
			into: 'relationships'
		});
	}
});

// This route post FormData to the server, so it does not
// use the edit controller mixin nor create a model for editing
Vilio.RelationshipsNewRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('relationships.new', {
			into: 'relationships'
		});
	},
    events: {
        create: function(evt) {
            console.log('CREATED');
            if (event.formData) {
                var route = this,
                    portfolio = this.controllerFor('portfolio').get('content');
                var success = function() {
                    route.transitionTo('relationships.index');
                };
                var error = function(xhr) {
                    //TODO show message
                };
                this.controller.upload(evt.formData, success, error);
            }
        },
        cancel: function(evt) {
            this.transitionTo('relationships.index');
        }
    }
});
