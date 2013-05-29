Vilio.FieldsRoute = Ember.Route.extend({
    model: function() {
        return Vilio.MetadataField.find();
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

Vilio.FieldsShowRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('fields.show', {
          into: 'fields',
          outlet: 'main'
        });
    },
    events: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('fields.edit', model);
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
			this.controller.saveEdits(function() {
				route.transitionTo('fields.show', route.controller.get('content'));
			});
		}
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});

Vilio.FieldsEditRoute = Ember.Route.extend({
   	// create transaction and add model to it
	setupController: function(controller, model) {
        this._super(controller, model);
		var transaction = this.store.transaction();
		transaction.add(model);
		controller.startEditing(transaction);
	},
    renderTemplate: function() {
        this.render('fields.edit', {
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
			this.controller.saveEdits(function() {
				route.transitionTo('fields.show', route.controller.get('content'));
			});
		}
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});
