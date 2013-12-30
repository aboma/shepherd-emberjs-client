Shepherd.MetadataListsIndexController = Ember.ObjectController.extend({});

Shepherd.MetadataListsController = Ember.ArrayController.extend({
    needs: ['metadata_list'],
    sortProperties: ['name'],
    sortAscending: true,
    selectedBinding: Ember.Binding.oneWay('controllers.metadata_list.content'),

    namesList: function() {
        var lists = this.get('content');
        return lists.mapProperty('name');
    }.property('content'),

    listsExist: function() {
        return this.get('content.length') > 0;
    }.property('content.@each')
});

Shepherd.MetadataListController = Ember.ObjectController.extend(Shepherd.ResourceControllerMixin, {
    sortedMetadatumListValues: function() {
        return this.get('content.metadatumListValues').sortBy('value');
    }.property('content')
});

Shepherd.MetadataListShowController = Shepherd.MetadataListController.extend({});

Shepherd.MetadataListsNewController = Ember.ObjectController.extend(Shepherd.EditModelControllerMixin, {
    // remove blank values from values array as these may cause an
    // error on the server
    removeBlankValues: function() {
        var values = this.get('content.metadatumListValues');
        var blankValues = values.filter(function(item) {
            var value = item.get('value');
            if (!value || value.trim().length === 0) {
                return true;
            }
            return false;
        }, this);
        values.removeObjects(blankValues);
    },
    actions: {
        addValue: function() {
            var newValue = this.store.createRecord(Shepherd.MetadatumListValue, {});
            var values = this.get('content.metadatumListValues');
            if (values) { values.pushObject(newValue); }
        }
    }
});

Shepherd.MetadataListEditController = Shepherd.MetadataListsNewController.extend({
    needs: ['metadata_list'],
    uri: Ember.computed.alias('controllers.metadata_list.uri'),
});
