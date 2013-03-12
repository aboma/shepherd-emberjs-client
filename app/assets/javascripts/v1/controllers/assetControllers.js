Luxin.AssetsController = Ember.ArrayController.extend({});

Luxin.AssetController = Ember.ObjectController.extend({});

Luxin.AssetsIndexController = Ember.ArrayController.extend({});

Luxin.AssetsNewController = Ember.ObjectController.extend({});

Luxin.ThumbnailController = Ember.ArrayController.extend({
	thumbnail: (function() {
		var t = this.get('content').filterProperty('rel', 'thumbnail');
		return t;
	}).property('content.@each'),
	
	full_path: function() {
		var url = this.get('href');
		if (!url) return null;
		return url + '?x-api-key=' + auth_token;
	}.property('content.@each.href'),
});