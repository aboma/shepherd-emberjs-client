Vilio.AssetsIndexController = Ember.ArrayController.extend({});

Vilio.AssetsController = Ember.ObjectController.extend({});

Vilio.AssetController = Ember.ObjectController.extend({});

Vilio.AssetsNewController = Ember.ObjectController.extend({});

Vilio.ThumbnailController = Ember.ArrayController.extend({
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