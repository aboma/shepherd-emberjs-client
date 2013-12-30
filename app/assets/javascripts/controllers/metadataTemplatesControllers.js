Shepherd.TemplatesIndexController = Ember.ObjectController.extend({});

Shepherd.TemplatesController = Ember.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true,

    templatesExist: function() {
        return this.get('content.length') > 0;
    }.property('content.@each')
});

Shepherd.TemplateController = Ember.ObjectController.extend(Shepherd.ResourceControllerMixin, {});

Shepherd.TemplateShowController = Ember.ObjectController.extend({
    needs: ['fields', 'template'],
    uri: Ember.computed.alias('controllers.template.uri'),
    fields: Ember.computed.alias('controllers.fields.content'),

    // sort the field settings by the order selected by the user
    orderedFieldSettings: function() {
        return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
            sortProperties: ['order'],
            content: this.get('content.metadataTemplateFieldSettings')
        });
    }.property('content.metadataTemplateFieldSettings.@each')
});

Shepherd.TemplatesNewController = Shepherd.TemplateShowController.extend(Shepherd.EditModelControllerMixin, {
    needs: ['fields', 'template'],
    uri: Ember.computed.alias('controllers.template.uri'),
    fields: Ember.computed.alias('controllers.fields.content'),

    // complement of the set of fields that have been selected into the template
    // and all fields available for selection
    unselectedFields: function() {
        var fieldSettings = this.get('content.metadataTemplateFieldSettings');
        var fsFields = fieldSettings.mapProperty('metadatumField');
        var fields = this.get('fields');
        if (fsFields && fields) {
            return fields.filter(function(field) {
                return !fsFields.contains(field);
            }, this);
        } else {
            return null;
        }
    }.property('content.metadataTemplateFieldSettings.@each'),

    // find the field being dragged by the user
    currentDragField: Ember.computed(function() {
        return this.findProperty('isDragging', true);
    }).property('@each.isDragging').cacheable(),

    // add a field setting to collection
    addFieldSetting: function(field) {
        var length = this.get('orderedFieldSettings.length');
        this.get('content.metadataTemplateFieldSettings').createRecord({
            metadatumField: field, 
            required: false, 
            order: length + 1
        });
    },

    removeFieldSetting: function(fieldSetting) {
        this.get('content.metadataTemplateFieldSettings').removeObject(fieldSetting);
    },

    promote: function(fieldSetting) {
        this.reorderSettings(fieldSetting, fieldSetting.get('order') - 1);
    },

    demote: function(fieldSetting) {
        this.reorderSettings(fieldSetting, fieldSetting.get('order') + 1);
    },

    reorderSettings: function(fieldSetting, newOrder) {
        var order = fieldSetting.get('order');
        var fs = this.get('orderedFieldSettings');
        fs.objectAt(newOrder - 1).set('order', order);
        fieldSetting.set('order', newOrder);
    }
});

Shepherd.TemplateEditController = Shepherd.TemplatesNewController.extend({});

Shepherd.FieldDraggableController = Ember.ObjectController.extend({});
