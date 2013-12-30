Shepherd.RelationshipsRoute = Ember.Route.extend({
    // get relationships for portfolio; these contain 
	// portfolio <-> asset relationship;  
    model: function() {
		return this.modelFor('portfolio').get('relationships');
    },
    setupController: function(controller, model) {
		var id = this.modelFor('portfolio').get('id');
        controller.set('portfolioName', this.modelFor('portfolio').get('name'));
        this._super(controller, model);
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
        return this.store.createRecord('relationship', { portfolio: port });
    },
	renderTemplate: function() {
		this.render('relationships.new', {
			into: 'relationships'
		});
	},
    actions: {
        create: function(evt) {
            if (evt.data) {
                var route = this;
                route.controller.get('content').set('formData', evt.data);
			    this.controller.saveEdits().then(function(newRelation) {
				    console.log(newRelation);
				    console.log('relationship created');
                    // reload relationships
                    //route.controllerFor('relationships').reloadContent();
                    // show relationship in edit view
    				route.transitionTo('relationship.edit', newRelation);
                }, function(error) {
                    var msgController = route.controllerFor('message');
                    if (msgController) msgController.set('message', 'error saving record');
                    alert('error saving record: ' + errors[0]);
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
    actions: {
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
