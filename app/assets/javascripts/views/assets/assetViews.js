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

Vilio.AssetView = Ember.ContainerView.extend({
    childViews: ['assetMini'],

    assetMini: Em.View.extend({
        templateName : 'assets/mini'
    }),

    selectionChanged: function() {
        if (this.get('controller.isSelected')) {
		    this.showAssetModalView();
        } else {
            this.closeModalView();
        }
    }.observes('controller.isSelected'),

    closeModalView: function() {
		if (this.assetModalView) {
            this.removeObject(this.assetModalView);
			this.assetModalView.destroy();
            this.assetModalView = null;
        }
	},

	// open modal view of relationship to show all
	// details
	showAssetModalView: function() {
		this.closeModalView();
		this.assetModalView = Vilio.AssetModalView.create({
			controller: this.controller,
			baseView: this,
            container: this.get('container')
		});
		this.pushObject(this.assetModalView);		
	}

});

Vilio.AssetEditView = Ember.View.extend({
	templateName : 'assets/edit',
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
