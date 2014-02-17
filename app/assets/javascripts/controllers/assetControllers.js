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

Shepherd.AssetController = Ember.ObjectController.extend(
                                                      Shepherd.EditModelControllerMixin, { 
    needs: ['portfolio', 'assetsIndex', 'assetEdit'],
    metadataForEditing: Ember.ArrayProxy.create(),
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

    // display portfolios this asset has a relationship with as a string
    portfolioListString: function() {
        var portfolios = this.get('content.portfolios');
        if (portfolios) {
            return portfolios.map(function(item) {
                return item.get('name');
            }).join(', ');
        } else {
            return null;
        }
    }.property('content.portfolios'),

    createMetadataForEditing: function() {
        var controller = this;
        var metadataForEditing = Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
            sortProperties: ['order'],
            content: Ember.A()
        });
        var portfolio = this.get('controllers.portfolio');
        var fieldSettings = this.get('metadataTemplate.metadataTemplateFieldSettings');
        console.log('creating metadata for editing');
        if (!portfolio || !fieldSettings) { return null; }
        // load metadata for asset ansynchronously and process once available; return
        // promise so view updates when data available
        this.get('content').get('metadata').then(function(metadata) {
            // copy template field settings and asset metadata to new temp object
            // for editing and display purposes
            fieldSettings.forEach(function(fieldSetting) {
                // does metadata exist on asset?
                var metadatumField, fieldType, metadatum,
                    metadatumValues, metadatumValuesList, metadatumForEditing;
                metadatumField = fieldSetting.get('metadatumField');
                fieldType = metadatumField.get('type');
                if (metadata) {
                    metadatum = metadata.findProperty('metadatumField', metadatumField);
                }
                // if metadatum value does not exist yet, create for purposes of editing;
                // remove null values before committing
                if (!metadatum) {
                    metadatum = controller.store.createRecord('metadatum', {
                        metadatumField: metadatumField,
                        metadatumValue: null
                    });
                }
                metadatumValuesList = metadatum.get('metadatumField.allowedValuesList');
                if (metadatumValuesList) {
                    metadatumValues = metadatumValuesList.get('metadatumListValues')
                                        .mapProperty('value').sort();
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

            controller.set('metadataForEditing', metadataForEditing);
        });
    }.observes('content').on('init'),

    actions: {
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
            window.location = this.get('file');
        }
    }
});


Shepherd.AssetEditController = Shepherd.AssetController.extend({});

Shepherd.AssetModalEditController = Shepherd.AssetController.extend({});

Shepherd.AssetsController = Ember.ObjectController.extend({});

Shepherd.AssetsNewController = Shepherd.AssetEditController.extend({});
