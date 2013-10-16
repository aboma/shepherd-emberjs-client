Shepherd.AssetsIndexController = Ember.ArrayController.extend({
    // asset selected from the list view
    selectedAsset: null,

    clearSelected: function() {
        this.set('selectedAsset', null);
    },
    setSelected: function(asset) {
        this.set('selectedAsset', asset);
    }
});

Shepherd.AssetController = Ember.ObjectController.extend(Shepherd.ResourceControllerMixin, 
                                                      Shepherd.EditModelControllerMixin, { 
    needs: ['portfolio', 'assetsIndex', 'assetEdit', 'assetImage'],
    isEditing: false,

    // determine if this is the relationship selected from the list; 
    // allows for setting the selected relationship programmatically 
    // and then having the appropriate individual view respond
    isSelected: function() {
        return (this.get('content') === this.get('controllers.assetsIndex.selectedAsset'));
    }.property('controllers.assetsIndex.selectedAsset'),

    originalFileUrl: (function() {
		var fileLink = this.get('content.links').findProperty('rel', 'file');
        var fileUrl = fileLink.get('href');
        return fileUrl;
    }).property('content.@each'),

    metadataTemplate: function() {
        return this.get('controllers.portfolio.content.metadataTemplate');
    }.property('controllers.portfolio.content'),

    portfolioListString: function() {
        return this.get('content.portfolios').map(function(item, index, enumerable) {
            return item.get('name');
        }).join(', ');
    }.property('content.portfolios'),

    metadataForEditing: function() {
        console.log('creating metadata for editing');
        var metadataForEditing = Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
          sortProperties: ['order'],
          content: Ember.A()
        });
        var portfolio = this.get('controllers.portfolio');
        var fieldSettings = this.get('metadataTemplate.metadataTemplateFieldSettings');
        if (!portfolio || !fieldSettings) return null;
        // copy template field settings and asset metadata to new temp object
        // for editing and display purposes
        fieldSettings.forEach(function(fieldSetting, index) {
           // does metadata exist on asset?
           var metadatumField, fieldType, metadata, metadatum,
              metadatumValues, metadatumValuesList;
           metadatumField = fieldSetting.get('metadatumField');
           fieldType = metadatumField.get('type');
           metadata = this.get('content.metadata');
           if (metadata) {
              metadatum = metadata.findProperty('metadatumField', metadatumField);
           }
           // if metadatum value does not exist yet, create for purposes of editing;
           // remove null values before committing
           if (!metadatum) {
              metadatum = Shepherd.MetadatumValue.createRecord({
                  metadatumField: metadatumField,
                  metadatumValue: null
              });
           }
           metadatumValuesList = metadatum.get('metadatumField.allowedValuesList');
           if (metadatumValuesList) {
               metadatumValues = metadatumValuesList.get('metadatumListValues').mapProperty('value');
           }
           metadatumForEditing = Ember.Object.create({
               order: fieldSetting.get('order'), 
               metadatum: metadatum,
               metadatumValues: metadatumValues,
               isText: (fieldType === 'text'),
               isBoolean: (fieldType === 'boolean')
           });
           metadataForEditing.pushObject(metadatumForEditing);
        }, this);
        return metadataForEditing;
    }.property('content'),

    edit: function() {
        this.set('isEditing', true);
    },
    stopEditing: function() {
        this.set('isEditing', false);
    },
    cancel: function() {
        var controller = this;
        this.stopEditing().then(function() {
            controller.set('isEditing', false);
        });
	},
    save: function() {
        var controller = this;
        var metadata = this.get('metadataForEditing').mapProperty('metadatum');
        this.get('content.metadata').pushObjects(metadata);
        this.saveEdits().then(function() {
            controller.set('isEditing', false);
        });
    },
    download: function() {
        console.log('download');
        var fileUrl = this.get('originalFileUrl');
        window.location = fileUrl;
    }
});


Shepherd.AssetEditController = Shepherd.AssetController.extend({});

Shepherd.AssetModalEditController = Shepherd.AssetController.extend({});

Shepherd.AssetsController = Ember.ObjectController.extend({});

Shepherd.AssetsNewController = Shepherd.AssetEditController.extend({});

Shepherd.AssetImageController = Ember.ArrayController.extend({
    originalImage: (function() {
        var content = this.get('content');
        if (content) {
          return content.findProperty('rel', 'image');
        } else {
          return null;
        }
    }).property('content.@each'),

    thumbnail: (function() {
        var content = this.get('content');
        if (content) {
          return content.findProperty('rel', 'thumbnail');
        } else {
          return null;
        }
	}).property('content.@each'),

    fullPath: function() {
		var url = this.get('href');
		if (!url) return null;
		return url + '?x-api-key=' + auth_token;
	}.property('content.@each.href')
});

Shepherd.ThumbnailController = Shepherd.AssetImageController.extend({});
