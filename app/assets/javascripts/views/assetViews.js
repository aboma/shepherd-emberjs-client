Vilio.AssetsView = Ember.View.extend(Vilio.ViewWithModalMixin, {
	templateName : 'assets/assets',

	createModalView: function() {
		return Vilio.AssetModalView.create({
			controller: this.controller,
            container: this.get('container')
		});
	}
});

Vilio.AssetsIndexView = Ember.View.extend({
	templateName : 'assets/assetIndex'
});

Vilio.NewAssetView = Ember.View.extend({
	templateName : 'assets/new_asset'
});

Vilio.AssetView = Ember.View.extend({
    templateName: 'assets/assetMini'
});

Vilio.AssetEditView = Ember.View.extend({
	templateName : 'assets/assetEdit'
});

Vilio.AssetModalEditView = Ember.View.extend({
	layoutName : 'layouts/modal',
	templateName : 'assets/assetEdit',
	showHeader: true,

	close: function() {
		this.destroy();
	}
});

Vilio.ThumbnailView = Ember.View.extend({
	templateName : 'assets/assetThumbnail'
});

Vilio.AssetImageView = Ember.View.extend({
    templateName: 'assets/assetImage'
});


Vilio.AssetMetadataView = Ember.View.extend({
    templateName: 'assets/assetMetadata',
    classNames: ['asset-details-metadata']
});
