Vilio.PortfoliosIndexController = Ember.ObjectController.extend({});

Vilio.PortfoliosController = Ember.ArrayController.extend({
	needs: ['portfolio'],
	content: null,
	sortProperties: ['name'],
	sortAscending: true,
	selectedBinding: Ember.Binding.oneWay("controllers.portfolio.content"),

	clearSelected : function() {
		console.log('clearing selected portfolio');
		this.set('selected', null);
	},

  	contentLoaded: function() {
  		console.log('controller content is loaded');
  		// set default value to null so prompt is shown, not first item
  		//this.set('selectedPortfolio', null);
  	}.observes('content.isLoaded')
});

Vilio.PortfolioController = Ember.ObjectController.extend(Vilio.ResourceControllerMixin, {});

Vilio.PortfolioShowController = Ember.ObjectController.extend({});

Vilio.PortfolioEditController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
  needs: ['portfolio'],
  uri: Ember.computed.alias('controllers.portfolio.uri') 
});

Vilio.PortfoliosNewController = Vilio.PortfolioEditController.extend({});
