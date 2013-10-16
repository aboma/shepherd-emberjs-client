Shepherd.TemplatesRoute = Ember.Route.extend({
    model: function() {
        return Shepherd.MetadataTemplate.find();
    },
	setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('topNav').set('selected', 'Metadata Templates');
    }
});


Shepherd.TemplatesIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
    	this.render('templates.index', {
	    	into: 'templates',
    		outlet: 'main'
    	});
    }
});

Shepherd.TemplateRoute = Ember.Route.extend({});

Shepherd.TemplateShowRoute = Ember.Route.extend({
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

Shepherd.TemplatesNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		return transaction.createRecord(Shepherd.MetadataTemplate, {});
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

Shepherd.TemplateEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('template');
    },
   	// create transaction and add model to it
	setupController: function(controller, model) {
        this._super(controller, model);
		this.store.transaction().add(model);
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
