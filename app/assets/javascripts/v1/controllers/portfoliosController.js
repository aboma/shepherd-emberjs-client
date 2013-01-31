Luxin.PortfoliosController = Ember.ArrayController.extend({
	needs: ['portfolio'],
	sortProperties: ['name'],
	sortAscending: true,
	selectedPortfolioBinding: "Luxin.portfolioController.content",
		
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

Luxin.PortfolioController = Ember.ObjectController.extend({});

Luxin.EditPortfolioController = Ember.ObjectController.extend({});