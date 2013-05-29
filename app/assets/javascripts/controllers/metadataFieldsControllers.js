Vilio.FieldsIndexController = Ember.ObjectController.extend({});

Vilio.FieldsController = Ember.ArrayController.extend({
  needs: ['field'],
  sortProperties: ['name'],
  sortAscending: true,
  selectedBinding: Ember.Binding.oneWay('controllers.field.content')
});

Vilio.FieldController = Ember.ObjectController.extend({});

Vilio.FieldsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {});

Vilio.FieldsEditController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {});
