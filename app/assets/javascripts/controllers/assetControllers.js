Vilio.AssetsIndexController = Ember.ArrayController.extend({
    // asset selected from the list view
    selectedAsset: null,

    clearSelected: function() {
        this.set('selectedAsset', null);
    },
    setSelected: function(asset) {
        this.set('selectedAsset', asset);
    }
});

Vilio.AssetController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, 
                                                      Vilio.EditModelControllerMixin, { 
    needs: ['portfolio', 'assetsIndex', 'assetEdit'],
    metadataForEditing: null,
    isEditing: false,

    // determine if this is the relationship selected from the list; 
    // allows for setting the selected relationship programmatically 
    // and then having the appropriate individual view respond
    isSelected: function() {
        return (this.get('content') === this.get('controllers.assetsIndex.selectedAsset'));
    }.property('controllers.assetsIndex.selectedAsset'),

    metadataTemplate: function() {
        return this.get('controllers.portfolio.content.metadataTemplate');
    }.property('controllers.portfolio.content'),

    metadata2: function() {
        var metadata = this.get('metadataForEditing');
        if (!metadata) {
            metadata = this.createMetadataForEditing();
        }
        return metadata;
    }.property('content'),

    createMetadataForEditing: function() {
        var metadatas = this.get('content.metadata');
        var metadataForEditing = Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
          sortProperties: ['order'],
          content: Ember.A()
        });
        var portfolio = this.get('controllers.portfolio');
        //TODO fix
        var fieldSettings = this.get('metadataTemplate.metadataTemplateFieldSettings');
        if (!portfolio || !fieldSettings) return null;
        // copy template field settings and asset metadata to new temp object
        // for editing and display purposes
        fieldSettings.forEach(function(fieldSetting, index) {
           // does metadata exist on asset?
           var metadatumField = fieldSetting.get('metadataField');
           var fieldType = metadatumField.get('type');
           var metadatum = this.get('content.metadata').findProperty('metadatumField', metadatumField); 
           // if metadatum value does not exist yet, create for purposes of editing;
           // remove null values before committing
           if (!metadatum) {
              metadatum = Vilio.MetadatumValue.createRecord({
                  metadatumField: metadatumField,
                  metadatumValue: null
              });
              this.get('content.metadata').pushObject(metadatum);
           }
           metadatumForEditing = Ember.Object.create({
               order: fieldSetting.get('order'), 
               metadatum: metadatum,
               isText: (fieldType === 'text'),
               isBoolean: (fieldType === 'boolean')
           });
           metadataForEditing.pushObject(metadatumForEditing);
        }, this);
        this.set('metadataForEditing', metadataForEditing);
        return metadataForEditing;
    },
    edit: function() {
        this.set('isEditing', true);
    },
    cancel: function() {
		this.set('isEditing', false);
	},
    save: function() {
        var controller = this;
        this.saveEdits().then(function() {
            controller.set('isEditing', false);
        });
    }
});


Vilio.AssetEditController = Vilio.AssetController.extend({});

Vilio.AssetsController = Ember.ObjectController.extend({});

Vilio.AssetsNewController = Vilio.AssetEditController.extend({});

Vilio.AssetImageController = Ember.ArrayController.extend({
    originalImage: (function() {
		return this.get('content').findProperty('rel', 'image');
    }).property('content.@each'),

    thumbnail: (function() {
		return this.get('content').findProperty('rel', 'thumbnail');
	}).property('content.@each'),

    fullPath: function() {
		var url = this.get('href');
		if (!url) return null;
		return url + '?x-api-key=' + auth_token;
	}.property('content.@each.href')
});

Vilio.ThumbnailController = Vilio.AssetImageController.extend({});
