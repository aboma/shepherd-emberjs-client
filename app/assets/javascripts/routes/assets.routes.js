Vilio.AssetsRoute = Ember.Route.extend({});

Vilio.AssetsIndexRoute = Ember.Route.extend({
	model: function() {
		return Vilio.Asset.find();
	},
	setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('topNav').set('selected', 'Assets');
    },
    events: {
        editAsset: function(asset) {
            this.controller.setSelected(asset);
        }
    }
});
