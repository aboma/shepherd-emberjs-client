Vilio.TemplatesIndexController = Ember.ObjectController.extend({});

Vilio.TemplatesController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  sortAscending: true
});

Vilio.TemplateController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, {});

Vilio.TemplateShowController = Ember.ObjectController.extend({
  needs: ['fields', 'template'],
  uri: Ember.computed.alias('controllers.template.uri'),
  fields: Ember.computed.alias('controllers.fields.content')
});

Vilio.TemplatesNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
  needs: ['fields', 'template'],
  uri: Ember.computed.alias('controllers.template.uri'),
  fields: Ember.computed.alias('controllers.fields.content'),

  // complement of the set of fields that have been selected into the template
  // and all fields available for selection
  unselectedFields: function() {
    var fieldSettings = this.get('content.metadataTemplateFieldSettings');
    var fsFields = fieldSettings.mapProperty('field');
    var fields = this.get('fields');
    if (fsFields && fields) {
      return fields.filter(function(field, index) {
        return !fsFields.contains(field);
      }, this);
    } else {
      return null;
    }
  }.property('content.metadataTemplateFieldSettings.@each'),

  // find the field being dragged by the user
  currentDragField: Ember.computed(function(key, value) {
    return this.findProperty('isDragging', true);
  }).property('@each.isDragging').cacheable(),

  // add a field setting to collection
  addFieldSetting: function(field) {
    var template = this.get('content');
    this.get('content.metadataTemplateFieldSettings').createRecord({
        field: field, 
        required: false, 
        order: 1
    });
}
});

Vilio.TemplateEditController = Vilio.TemplatesNewController.extend({});

Vilio.FieldDraggableController = Ember.ObjectController.extend({});
