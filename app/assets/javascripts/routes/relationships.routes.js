Shepherd.RelationshipsRoute = Ember.Route.extend({
    // get relationships for portfolio; these contain 
	// portfolio <-> asset relationship; model must be set on 
    // setupController because setting filtered model in
    // model hook does not work
    setupController: function(controller, model) {
		var id = this.modelFor('portfolio').get('id');
		model = Shepherd.Relationship.find({ portfolio_id: id });
        controller.set('content', model);
        controller.set('portfolioName', this.modelFor('portfolio').get('name'));
    },
	renderTemplate: function() {
		this.render('relationships', {
			into: 'portfolios',
			outlet: 'detail'
		})
	}
});

Shepherd.RelationshipsIndexRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('relationships.index', {
			into: 'relationships'
		});
	}
});

// This route post FormData to the server, so it does not
// use the edit controller mixin nor create a model for editing
Shepherd.RelationshipsNewRoute = Ember.Route.extend({
    model: function() {
        var port = this.modelFor('portfolio');
        return this.store.transaction().createRecord(Shepherd.Relationship, { portfolio: port });
    },
	renderTemplate: function() {
		this.render('relationships.new', {
			into: 'relationships'
		});
	},
    events: {
        create: function(evt) {
            if (evt.formData) {
                var route = this;
                route.controller.get('content').set('formData', evt.formData);
			    this.controller.saveEdits().then(function(record) {
				    console.log('relationship created');
                    // show relationship in edit view
    				route.transitionTo('relationship.edit', record);
	    		}, function() {
                    console.log('error creating relationship');
                });
            }
        },
        cancel: function(evt) {
            this.transitionTo('relationships.index');
        }
    }
});

Shepherd.RelationshipRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('relationship', {
			into: 'relationships'
		});
	}
});

Shepherd.RelationshipEditRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('relationship');
    },
	renderTemplate: function() {
		this.render('relationship.edit', {
			into: 'relationships'
		});
	},
    events: {
        destroyRelationship: function(event) {
            var route = this;
            console.log('detroying relationship');
            this.controller.deleteRecord().then(function() {
                route.transitionTo('relationships.index');
            }, function() {
                //TODO handle error
            });
        }
    }
});
