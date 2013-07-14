Vilio.AssetsIndexController = Ember.ArrayController.extend({});

Vilio.AssetsController = Ember.ObjectController.extend({});

Vilio.AssetController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, {});

Vilio.AssetsNewController = Ember.ObjectController.extend({});

Vilio.ThumbnailController = Ember.ArrayController.extend({
	thumbnail: (function() {
		return this.get('content').filterProperty('rel', 'thumbnail');
	}).property('content.@each'),

	full_path: function() {
		var url = this.get('href');
		if (!url) return null;
		return url + '?x-api-key=' + auth_token;
	}.property('content.@each.href'),
});

Vilio.AssetImageController = Ember.ArrayController.extend({
    fullSizeImage: (function() {
		return this.get('content').filterProperty('rel', 'self');
    }).property('content.@each')
});
