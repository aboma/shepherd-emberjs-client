Vilio.FieldsIndexController = Ember.ObjectController.extend({});

Vilio.FieldsController = Ember.ArrayController.extend({
  needs: ['field'],
  sortProperties: ['name'],
  sortAscending: true,
  selectedBinding: Ember.Binding.oneWay('controllers.field.content')
});

Vilio.FieldController = Ember.ObjectController.extend({});

Vilio.FieldsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
  needs: ['setting', 'metadata_lists'],
  fieldTypes: Ember.computed.alias('controllers.setting.fieldTypes'),
  fieldValuesLists: Ember.computed.alias('controllers.metadata_lists.content')
});

Vilio.FieldEditController = Vilio.FieldsNewController.extend({
  uri: function() {
    var links = this.get('content.links');
    if (!links) return null;
    return links.findProperty('rel', 'self');
  }.property('content.links')
});
