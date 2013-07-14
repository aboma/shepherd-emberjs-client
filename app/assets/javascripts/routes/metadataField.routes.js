Vilio.FieldsRoute = Ember.Route.extend({
    model: function() {
        return Vilio.MetadataField.find();
    },
    // load values lists for forms
    setupController: function(controller, model) {
        var metadataValuesListsController = this.controllerFor('metadata_lists');
        if (metadataValuesListsController) 
          metadataValuesListsController.set('model', Vilio.MetadataValuesList.find({}));
        this._super(controller, model);
    }	
});


Vilio.FieldsIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
    	this.render('fields.index', {
	    	into: 'fields',
    		outlet: 'main'
    	});
    }
});

Vilio.FieldRoute = Ember.Route.extend({});

Vilio.FieldShowRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('field');
    },
    renderTemplate: function() {
        this.render('field.show', {
          into: 'fields',
          outlet: 'main'
        });
    },
    events: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('field.edit', model);
        }
    }
});

Vilio.FieldsNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		this.controllerFor(this.routeName).startEditing(transaction);
		return transaction.createRecord(Vilio.MetadataField, {});
	},
    renderTemplate: function() {
		this.render('fields.new', {
			into: 'fields',
            outlet: 'main'
		});
	},
	events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('fields.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('field.show', route.controller.get('content'));
			}, function() {
                // error handled on controller
            });
		}
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});

Vilio.FieldEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('field');
    },
   	// create transaction and add model to it
	setupController: function(controller, model) {
        this._super(controller, model);
		var transaction = this.store.transaction();
		transaction.add(model);
		controller.startEditing(transaction);
	},
    renderTemplate: function() {
        this.render('field.edit', {
            into: 'fields',
            outlet: 'main'
        });
    },
    events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('fields.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('field.show', route.controller.get('content'));
			}, function() {
                // error handled on controller                               
            });
		},
        remove: function() {
            var route = this;
            this.controller.deleteRecord().then(function() {
                route.transitionTo('fields.index');
            });
        }
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});
