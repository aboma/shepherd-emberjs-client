Vilio.MetadataListsIndexController = Ember.ObjectController.extend({});

Vilio.MetadataListsController = Ember.ArrayController.extend({
  needs: ['metadata_list'],
  sortProperties: ['name'],
  sortAscending: true,
  selectedBinding: Ember.Binding.oneWay('controllers.metadata_list.content'),
  namesList: function() {
    var lists = this.get('content');
    return lists.mapProperty('name');
  }.property('content.[]')
});

Vilio.MetadataListController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, {});

Vilio.MetadataListShowController = Ember.ObjectController.extend({
  needs: ['metadata_list'],
  uri: Ember.computed.alias('controllers.metadata_list.uri')
});

Vilio.MetadataListsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {});

Vilio.MetadataListEditController = Vilio.MetadataListsNewController.extend({
  needs: ['metadata_list'],
  uri: Ember.computed.alias('controllers.metadata_list.uri')
});
