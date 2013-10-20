Shepherd.FieldsIndexController = Ember.ObjectController.extend({});

Shepherd.FieldsController = Ember.ArrayController.extend({
  needs: ['field'],
  sortProperties: ['name'],
  sortAscending: true,
  selectedBinding: Ember.Binding.oneWay('controllers.field.content'),

  fieldsExist: function() {
      return this.get('content.length') > 0;
  }.property('content')
});

Shepherd.FieldController = Ember.ObjectController.extend(Shepherd.ResourceControllerMixin, {});

Shepherd.FieldShowController = Ember.ObjectController.extend({
  needs: ['field'],
  uri: Ember.computed.alias('controllers.field.uri')
});

Shepherd.FieldsNewController = Ember.ObjectController.extend(Shepherd.EditModelControllerMixin, {
  needs: ['setting', 'metadata_lists'],
  fieldTypes: Ember.computed.alias('controllers.setting.fieldTypes'),
  fieldValuesLists: Ember.computed.alias('controllers.metadata_lists.content')
});

Shepherd.FieldEditController = Shepherd.FieldsNewController.extend({
  needs: ['field'],
  uri: Ember.computed.alias('controllers.field.uri')
});
