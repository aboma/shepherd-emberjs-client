Vilio.FieldsIndexController = Ember.ObjectController.extend({});

Vilio.FieldsController = Ember.ArrayController.extend({
  needs: ['field'],
  sortProperties: ['name'],
  sortAscending: true,
  selectedBinding: Ember.Binding.oneWay('controllers.field.content')
});

Vilio.FieldController = Ember.ObjectController.extend({
  uri: function() {
    var links = this.get('content.links');
    if (!links) return null;
    var link = links.findProperty('rel', 'self');
    return link.get('href');
  }.property('content.links')
});

Vilio.FieldShowController = Ember.ObjectController.extend({
  needs: ['field'],
  uri: Ember.computed.alias('controllers.field.uri')
});

Vilio.FieldsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
  needs: ['setting', 'metadata_lists'],
  fieldTypes: Ember.computed.alias('controllers.setting.fieldTypes'),
  fieldValuesLists: Ember.computed.alias('controllers.metadata_lists.content')
});

Vilio.FieldEditController = Vilio.FieldsNewController.extend({
  needs: ['field'],
  uri: Ember.computed.alias('controllers.field.uri')
});
