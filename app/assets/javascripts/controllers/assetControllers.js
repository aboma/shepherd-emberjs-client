Vilio.AssetsIndexController = Ember.ArrayController.extend({});

Vilio.AssetsController = Ember.ObjectController.extend({});


Vilio.AssetEditController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, {
    needs: ['portfolio'],

    //TODO fix
    init: function() {
        var portfolio = this.get('controllers.portfolio.content');
        this.createMetadataValues(portfolio);
    },
    createMetadataValues: function(portfolio) {
        if (!portfolio) return;
        var fieldSettings = portfolio.get('metadataTemplate.metadataTemplateFieldSettings'),
            metaValues = this.get('content.metadataValues');
        if ((fieldSettings === null) || (metaValues !== null)) return;
        fieldSettings.forEach(function(item, index) {
            metaValues.pushObject(new Vilio.MetadataValue({
                metadataField: item.get('metadataField'),
                metadataValue: null
            }));
        }, this);
    }
});

Vilio.AssetController = Vilio.AssetEditController.extend({});

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
