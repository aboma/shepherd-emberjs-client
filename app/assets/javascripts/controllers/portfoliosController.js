Vilio.PortfoliosIndexController = Ember.ObjectController.extend({});

Vilio.PortfoliosController = Ember.ArrayController.extend({
	//needs: ['portfolioshow'],
	content: null,
	sortProperties: ['name'],
	sortAscending: true,
	selectedPortfolioBinding: "portfolio.content",
		
	
	clearSelected : function() {
		console.log('clearing selected portfolio');
		this.set('selectedPortfolio', null);
	},
	
	selected: function() {
		console.log(this.get('selectedPortfolio.name') + " portfolio selected");
		//this.get('target').transitionTo('root.portfolios.show_portfolio', this.get('selectedPortfolio'));
	}.observes("selectedPortfolio"),
	
  	contentLoaded: function() {
  		console.log('controller content is loaded');
  		// set default value to null so prompt is shown, not first item
  		//this.set('selectedPortfolio', null);
  	}.observes('content.isLoaded')
});

Vilio.PortfolioShowController = Ember.ObjectController.extend({
	selectedPortfolio: null,
});

Vilio.PortfolioEditController = Ember.ObjectController.extend(Vilio.EditModelMixin, {});

Vilio.PortfoliosNewController = Vilio.PortfolioEditController.extend({});