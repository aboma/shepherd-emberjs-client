Vilio.TemplatesRoute = Ember.Route.extend({
    model: function() {
        return Vilio.MetadataTemplate.find();
    },
    setupController: function(controller, model) {
        // load values lists for forms
        var metadataValuesListsController = this.controllerFor('metadata_lists');
        if (metadataValuesListsController) 
          metadataValuesListsController.set('model', Vilio.MetadataValuesList.find({}));
        // load fields
        var metadataFieldsController = this.controllerFor('fields');
        if (metadataFieldsController)
          metadataFieldsController.set('model', Vilio.MetadataField.find({}));
        this._super(controller, model);
    }	
});


Vilio.TemplatesIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
    	this.render('templates.index', {
	    	into: 'templates',
    		outlet: 'main'
    	});
    }
});

Vilio.TemplateRoute = Ember.Route.extend({});

Vilio.TemplateShowRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('template');
    },
    renderTemplate: function() {
        this.render('template.show', {
          into: 'templates',
          outlet: 'main'
        });
    },
    events: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('template.edit', model);
        }
    }
});

Vilio.TemplatesNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		this.controllerFor(this.routeName).startEditing(transaction);
		return transaction.createRecord(Vilio.MetadataTemplate, {});
	},
    renderTemplate: function() {
		this.render('templates.new', {
			into: 'templates',
            outlet: 'main'
		});
	},
	events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('templates.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('template.show', route.controller.get('content'));
			}, function() {
                // error handled on controller
            });
        }
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});

Vilio.TemplateEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('template');
    },
   	// create transaction and add model to it
	setupController: function(controller, model) {
        this._super(controller, model);
		var transaction = this.store.transaction();
		transaction.add(model);
		controller.startEditing(transaction);
	},
    renderTemplate: function() {
        this.render('template.edit', {
            into: 'templates',
            outlet: 'main'
        });
    },
    events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('templates.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('template.show', route.controller.get('content'));
			}, function() {
                // error handled on controller                               
            });
		},
        remove: function() {
          var route = this;
          this.controller.deleteRecord().then(function() {
              route.transitionTo('templates.index');
          });
        }
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});
