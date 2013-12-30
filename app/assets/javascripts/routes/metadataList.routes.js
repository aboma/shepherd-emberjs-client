Shepherd.MetadataListsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('metadatumValuesList');
    },
	setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('topNav').set('selected', 'Metadata Values Lists');
    }
});


Shepherd.MetadataListsIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('metadata_lists.index', {
            into: 'metadata_lists',
            outlet: 'main'
        });
    }
});

Shepherd.MetadataListsNewRoute = Ember.Route.extend({
	model: function() {
        return this.store.createRecord('metadatumValuesList');
	},
	renderTemplate: function() {
		this.render('metadata_lists.new', {
			into: 'metadata_lists',
            outlet: 'main'
		});
	},
	actions: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('metadata_lists.index');
		},
		save: function() {
			var route = this;
            this.controller.removeBlankValues();
			this.controller.saveEdits().then(function() {
                // reload metadata list to avoid duplicate records issue
                route.controller.get('content').reload().then(function() {
                    route.transitionTo('metadata_list.show', route.controller.get('content'));
                });
			});
		}
    } /*,
    deactivate: function() {
        this.controller.stopEditing();
    } */
});

Shepherd.MetadataListRoute = Ember.Route.extend({});

Shepherd.MetadataListShowRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('metadata_list');
    },
    renderTemplate: function() {
        this.render('metadata_list.show', {
            into: 'metadata_lists',
            outlet: 'main'
        });
    },
    actions: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('metadata_list.edit', model);
        }
    }
});

Shepherd.MetadataListEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('metadata_list');
    },
    renderTemplate: function() {
        this.render('metadata_list.edit', {
            into: 'metadata_lists',
            outlet: 'main'
        });
    },
    actions: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('metadata_lists.index');
		},
		save: function() {
			var route = this;
            this.controller.removeBlankValues();
			this.controller.saveEdits().then(function() {
                // reload metadata list to avoid duplicate records issue
                route.controller.get('content').reload().then(function() {
                    route.transitionTo('metadata_list.show', route.controller.get('content'));
                });
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
