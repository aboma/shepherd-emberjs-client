Shepherd.UsersRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('user');
    },
	setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('topNav').set('selected', 'Users');
    },
});

Shepherd.UsersIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('users.index', {
            into: 'users',
            outlet: 'detail'
        });
    }
});

Shepherd.UserRoute = Ember.Route.extend({});

Shepherd.UserShowRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('user');
    },
    renderTemplate: function() {
        this.render('user.show', {
          into: 'users',
          outlet: 'detail'
        });
    },
    actions: {
        edit: function() {
            var model = this.controller.get('content');
            this.transitionTo('user.edit', model);
        }
    }
});

Shepherd.UsersNewRoute = Ember.Route.extend({
	model: function() {
        return this.store.createRecord('user');
	},
    renderTemplate: function() {
		this.render('users.new', {
			into: 'users',
            outlet: 'detail'
		});
	},
	actions: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('users.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('user.show', route.controller.get('content'));
			}, function() {
                // error handled on controller
            });
		}
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});

Shepherd.UserEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('user');
    },
    renderTemplate: function() {
        this.render('user.edit', {
            into: 'users',
            outlet: 'detail'
        });
    },
    actions: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('users.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits().then(function() {
				route.transitionTo('user.show', route.controller.get('content'));
			}, function() {
                // error handled on controller                               
            });
		},
        remove: function() {
            var route = this;
            this.controller.deleteRecord().then(function() {
                route.transitionTo('users.index');
            });
        }
	},
    deactivate: function() {
        this.controller.stopEditing();
    }
});
