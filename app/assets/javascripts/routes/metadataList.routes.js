Vilio.MetadataListsRoute = Ember.Route.extend({
    model: function() {
        return Vilio.MetadatumValuesList.find();
    },
	setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('topNav').set('selected', 'Metadata Values Lists');
    }
});


Vilio.MetadataListsIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
    	this.render('metadata_lists.index', {
	    	into: 'metadata_lists',
    		outlet: 'main'
    	});
    }
});

Vilio.MetadataListsNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		return transaction.createRecord(Vilio.MetadatumValuesList, {});
	},
	renderTemplate: function() {
		this.render('metadata_lists.new', {
			into: 'metadata_lists',
            outlet: 'main'
		});
	},
	events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('metadata_lists.index');
		},
		save: function() {
			var route = this;
            this.controller.removeBlankValues();
			this.controller.saveEdits().then(function() {
				route.transitionTo('metadata_list.show', route.controller.get('content'));
			});
		}
    } /*,
    deactivate: function() {
        this.controller.stopEditing();
    } */
});

Vilio.MetadataListRoute = Ember.Route.extend({});

Vilio.MetadataListShowRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('metadata_list');
    },
    renderTemplate: function() {
        this.render('metadata_list.show', {
          into: 'metadata_lists',
          outlet: 'main'
        });
    },
    events: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('metadata_list.edit', model);
        }
    }
});

Vilio.MetadataListEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('metadata_list');
    },
   	// create transaction and add model to it
	setupController: function(controller, model) {
        this._super(controller, model);
		this.store.transaction().add(model);
	},
    renderTemplate: function() {
        this.render('metadata_list.edit', {
            into: 'metadata_lists',
            outlet: 'main'
        });
    },
    events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('metadata_lists.index');
		},
		save: function() {
			var route = this;
            this.controller.removeBlankValues();
			this.controller.saveEdits().then(function() {
				route.transitionTo('metadata_list.show', route.controller.get('content'));
			});
		},
        remove: function() {
            var route = this;
            this.controller.deleteRecord().then(function() {
                route.transitionTo('metadata_lists.index');
            });
        }
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});
