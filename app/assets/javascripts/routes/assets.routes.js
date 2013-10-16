Vilio.AssetsRoute = Ember.Route.extend({
	model: function() {
		return Vilio.Asset.find();
	},
	setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('topNav').set('selected', 'Assets');
    }
});

Vilio.AssetsIndexRoute = Ember.Route.extend({});

Vilio.AssetModalEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('asset');
    },
	renderTemplate: function() {
		this.render('asset.modalEdit', {
			into: 'assets'
		});
	}
});
