Vilio.RelationshipsRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('relationships', {
			into: 'portfolios',
			outlet: 'detail'
		})
	}
});

Vilio.RelationshipsIndexRoute = Ember.Route.extend({
    // get relationships for portfolio; these contain 
	// portfolio <-> asset relationship
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
    model: function() {
        var port = this.modelFor('portfolio');
        return this.store.transaction().createRecord(Vilio.Relationship, { portfolio: port });
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
                    // set this new record as selected relationship so that
                    // the view knows to display it in detail
                    var relCon = route.controllerFor('relationshipsIndex');
                    relCon.set('selectedRelationship', record);
                    // show the list of relationships for the portfolio
                    // with the new one selected
    				route.transitionTo('relationships.index');
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
