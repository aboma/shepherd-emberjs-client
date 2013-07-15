Vilio.AssetsIndexController = Ember.ArrayController.extend({});

Vilio.AssetsController = Ember.ObjectController.extend({});

Vilio.AssetController = Ember.ObjectController.extend({});

Vilio.AssetEditController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, {
    createMetadataValues: function(portfolio) {
        if (!portfolio) return;
        var fieldSettings = portfolio.get('metadataTemplate.metadataTemplateFieldSettings');
        if (fieldSettings !== null) return;
        fieldSettings.forEach(function(item, index) {
            this.get('content.metadataValues').pushObject(new Vilio.MetadataValue({
                metadataField: item.get('metadataField'),
                metadataValue: null
            }));
        }, this);
    }
});

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
