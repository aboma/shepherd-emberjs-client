Vilio.FieldsIndexController = Ember.ObjectController.extend({});

Vilio.FieldsController = Ember.ArrayController.extend({
  needs: ['field'],
  sortProperties: ['name'],
  sortAscending: true,
  selectedBinding: Ember.Binding.oneWay('controllers.field.content')
});

Vilio.FieldController = Ember.ObjectController.extend({});

Vilio.FieldsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
  needs: ['setting'],
  fieldTypes: Ember.computed.alias('controllers.setting.fieldTypes')
});

Vilio.FieldEditController = Vilio.FieldsNewController.extend({});
