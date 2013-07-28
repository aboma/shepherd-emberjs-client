Vilio.AssetsIndexController = Ember.ArrayController.extend({});

Vilio.AssetController = Ember.ObjectController.extend({
    needs: ['portfolio'],

    metadataTemplate: function() {
        return this.get('controllers.portfolio.content.metadataTemplate');
    }.property('controllers.portfolio.content'),

    metadata: function() {
        var metadata = Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
          sortProperties: ['order'],
          content: Ember.A()
        });
        var fieldSettings = this.get('metadataTemplate.metadataTemplateFieldSettings');
        // copy template field settings and asset metadata to new temp object
        // for editing and display purposes
        fieldSettings.forEach(function(fieldSetting, index) {
           // does metadata exist on asset?
           var metadatumField = fieldSetting.get('metadataField');
           var metadatum = this.get('content.metadata').findProperty('metadatumField', metadatumField); 
           var metadatumValue = metadatum ? metadatum.get('metadatumValue') : null;
           metadatumForEditing = Ember.Object.create({
               order: fieldSetting.get('order'), 
               metadatumField: metadatumField,
               metadatumValue: metadatumValue
           });
           metadata.pushObject(metadatumForEditing);
        }, this);
        return metadata;
    }.property('content'),
});


Vilio.AssetEditController = Vilio.AssetController.extend(Vilio.ResourceControllerMixin, {});

Vilio.AssetsController = Ember.ObjectController.extend({});

Vilio.AssetsNewController = Vilio.AssetEditController.extend({});

Vilio.AssetImageController = Ember.ArrayController.extend({
    originalImage: (function() {
		return this.get('content').findProperty('rel', 'image');
    }).property('content.@each'),

    thumbnail: (function() {
		var th = this.get('content').findProperty('rel', 'thumbnail');
        return th;
	}).property('content.@each'),

    fullPath: function() {
		var url = this.get('href');
		if (!url) return null;
		return url + '?x-api-key=' + auth_token;
	}.property('content.@each.href')
});

Vilio.ThumbnailController = Vilio.AssetImageController.extend({});
