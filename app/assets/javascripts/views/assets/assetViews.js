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
	templateName : 'assets/index'
});

Vilio.NewAssetView = Ember.View.extend({
	templateName : 'assets/new_asset'
});

Vilio.AssetView = Ember.View.extend({
	templateName : 'assets/show'
});

Vilio.AssetModalView = Ember.View.extend({
	layoutName : 'layouts/modal',
	templateName : 'assets/edit',
	showHeader: true,

	close: function() {
		this.destroy();
	}
});

Vilio.ThumbnailView = Ember.View.extend({
	templateName : 'assets/thumbnail'
});

Vilio.AssetImageView = Ember.View.extend({
    templateName: 'assets/image'
});


Vilio.AssetMetadataView = Ember.View.extend({
    templateName: 'assets/assetMetadata',
    classNames: ['asset-details-metadata']
});
