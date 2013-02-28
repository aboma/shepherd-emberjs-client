Luxin.PortfoliosIndexController = Ember.ObjectController.extend({});

Luxin.PortfoliosShowController = Ember.ObjectController.extend({
	selectedPortfolio: null,
});

Luxin.PortfoliosEditController = Ember.ObjectController.extend({});

Luxin.PortfoliosNewController = Ember.ObjectController.extend({});

Luxin.PortfoliosController = Ember.ArrayController.extend({
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