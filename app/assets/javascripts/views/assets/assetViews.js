Vilio.AssetsView = Ember.View.extend({
	templateName : 'assets/list_assets'
})

Vilio.NewAssetView = Ember.View.extend({
	templateName : 'assets/new_asset'
});

Vilio.AssetView = Ember.View.extend({
	templateName : 'assets/show',
	assetModalView : null,
	
	click: function() {
		this.showAssetModalView();
	},
	
	// handle close event
	close: function() {
		this.closeModalView();
	},
	
	closeModalView: function() {
		if (this.assetModalView) 
			this.assetModalView.destroy();	
	},
	
	// open modal view of asset to show all
	// details
	showAssetModalView: function() {
		this.closeModalView();
		this.assetModalView = Vilio.AssetModalView.create({
			controller: this.controller
		});
		this.assetModalView.append();		
	}
});

Vilio.AssetModalView = Ember.View.extend({
	layoutName : 'layouts/modal',
	templateName : 'assets/edit',
		
	close: function() {
		this.destroy();
	}
});

Vilio.ThumbnailView = Ember.View.extend({
	templateName : 'assets/thumbnail'
});