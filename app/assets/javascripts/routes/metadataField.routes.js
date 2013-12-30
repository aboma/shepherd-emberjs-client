Shepherd.FieldsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('metadatumField');
    },
    // load values lists for forms
    setupController: function(controller, model) {
        this._super(controller, model);
        var metadatumValuesListsController = this.controllerFor('metadata_lists');
        if (metadatumValuesListsController) 
          metadatumValuesListsController.set('model', this.store.find('metadatumValuesList'));
        this.controllerFor('topNav').set('selected', 'Metadata Fields');
    }	
});


Shepherd.FieldsIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
    	this.render('fields.index', {
	    	into: 'fields',
    		outlet: 'main'
    	});
    }
});

Shepherd.FieldRoute = Ember.Route.extend({});

Shepherd.FieldShowRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('field');
    },
    renderTemplate: function() {
        this.render('field.show', {
          into: 'fields',
          outlet: 'main'
        });
    },
    actions: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('field.edit', model);
        }
    }
});

Shepherd.FieldsNewRoute = Ember.Route.extend({
	model: function() {
        return this.store.createRecord('metadatumField');
	},
    renderTemplate: function() {
		this.render('fields.new', {
			into: 'fields',
            outlet: 'main'
		});
	},
	actions: {
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

Shepherd.FieldEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('field');
    },
    renderTemplate: function() {
        this.render('field.edit', {
            into: 'fields',
            outlet: 'main'
        });
    },
    actions: {
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
