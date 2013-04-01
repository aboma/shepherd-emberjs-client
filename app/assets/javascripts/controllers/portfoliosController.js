Vilio.PortfoliosIndexController = Ember.ObjectController.extend({});

Vilio.PortfoliosController = Ember.ArrayController.extend({
	needs: ['portfolio'],
	content: null,
	sortProperties: ['name'],
	sortAscending: true,
	selectedBinding: "controllers.portfolio.content",
	
	clearSelected : function() {
		console.log('clearing selected portfolio');
		this.set('selectedPortfolio', null);
	},
	
  	contentLoaded: function() {
  		console.log('controller content is loaded');
  		// set default value to null so prompt is shown, not first item
  		//this.set('selectedPortfolio', null);
  	}.observes('content.isLoaded')
});

Vilio.PortfolioController = Ember.ObjectController.extend({});

Vilio.PortfolioShowController = Ember.ObjectController.extend({});

Vilio.PortfolioEditController = Ember.ObjectController.extend(Vilio.EditModelMixin, {});

Vilio.PortfoliosNewController = Vilio.PortfolioEditController.extend({});