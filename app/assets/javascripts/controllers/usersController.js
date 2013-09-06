Vilio.UsersController = Ember.ArrayController.extend({
  sortProperties: ['lastName'],
  sortAscending: true
});

Vilio.UsersIndexController = Ember.ObjectController.extend({});

Vilio.UserController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, {});

Vilio.UserShowController = Ember.ObjectController.extend({
  needs: ['user'],
  uri: Ember.computed.alias('controllers.user.uri'),
});

Vilio.UsersNewController = Vilio.UserShowController.extend(Vilio.EditModelControllerMixin, {});

Vilio.UserEditController = Vilio.UsersNewController.extend({});
