Shepherd.AssetsView = Ember.View.extend(Shepherd.ViewWithModalMixin, {
	templateName : 'assets/assets',

	createModalView: function() {
		return Shepherd.AssetModalView.create({
			controller: this.controller,
            container: this.get('container')
		});
	}
});

Shepherd.AssetsIndexView = Ember.View.extend({
	templateName : 'assets/assetIndex'
});

Shepherd.NewAssetView = Ember.View.extend({
	templateName : 'assets/new_asset'
});

Shepherd.AssetView = Ember.View.extend({
    templateName: 'assets/assetMini'
});

Shepherd.AssetEditView = Ember.View.extend({
	templateName : 'assets/assetEdit'
});

Shepherd.AssetModalEditView = Ember.View.extend({
	layoutName : 'layouts/modal',
	templateName : 'assets/assetEdit',
	showHeader: true,

    actions: {
    	close: function() {
		    this.destroy();
	    }
    }
});

Shepherd.ThumbnailView = Ember.View.extend({
	templateName : 'assets/assetThumbnail'
});

Shepherd.AssetImageView = Ember.View.extend({
    templateName: 'assets/assetImage'
});


Shepherd.AssetMetadataView = Ember.View.extend({
    templateName: 'assets/assetMetadata',
    classNames: ['asset-details-metadata']
});
