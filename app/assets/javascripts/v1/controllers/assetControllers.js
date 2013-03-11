Luxin.AssetsController = Ember.ArrayController.extend({});

Luxin.AssetController = Ember.ObjectController.extend({
	full_path: function() {
		var url = this.get('file_path');
		if (!url) return null;
		return Luxin.CONFIG.url + url + '?x-api-key=' + auth_token;
	}.property('file_path')
});

Luxin.AssetsIndexController = Ember.ArrayController.extend({});

Luxin.AssetsNewController = Ember.ObjectController.extend({});