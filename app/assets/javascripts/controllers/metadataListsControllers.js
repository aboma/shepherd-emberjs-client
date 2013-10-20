Shepherd.MetadataListsIndexController = Ember.ObjectController.extend({});

Shepherd.MetadataListsController = Ember.ArrayController.extend({
  needs: ['metadata_list'],
  sortProperties: ['name'],
  sortAscending: true,
  selectedBinding: Ember.Binding.oneWay('controllers.metadata_list.content'),

  namesList: function() {
    var lists = this.get('content');
    return lists.mapProperty('name');
  }.property('content.[]'),

  listsExist: function() {
      return this.get('content.length') > 0;
  }.property('content')
});

Shepherd.MetadataListController = Ember.ObjectController.extend(Shepherd.ResourceControllerMixin, {});

Shepherd.MetadataListShowController = Ember.ObjectController.extend({
  needs: ['metadata_list'],
  uri: Ember.computed.alias('controllers.metadata_list.uri')
});

Shepherd.MetadataListsNewController = Ember.ObjectController.extend(Shepherd.EditModelControllerMixin, {
  addValue: function() {
    var newValue = this.get('content.transaction').createRecord(Shepherd.MetadatumListValue, {});
    var values = this.get('content.metadatumListValues');
    values.pushObject(newValue);
  },
  removeBlankValues: function() {
    var values = this.get('content.metadatumListValues');
    var blankValues = values.filter(function(item, index) {
      var value = item.get('value');
      if (!value || value.trim().length === 0)
        return true;
      return false;
    }, this);
    // remove blank values from values array
    values.removeObjects(blankValues);
  }
});

Shepherd.MetadataListEditController = Shepherd.MetadataListsNewController.extend({
  needs: ['metadata_list'],
  uri: Ember.computed.alias('controllers.metadata_list.uri')
});
