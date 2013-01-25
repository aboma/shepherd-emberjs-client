Luxin.PortfoliosController = Ember.ArrayController.extend({
	needs: ['portfolio'],
	sortProperties: ['name'],
	sortAscending: true, 
	selectedPortfolio: null,
		
	clearSelected : function() {
		console.log('clearing selected portfolio');
		this.set('selectedPortfolio', null);
	},
	
	// set selected portfolio if one is set on the portfolioController
	observeSelected : function(){
		console.log('responding to change of port on portController');
		var port = this.controllerFor('portfolio').get('content');
		this.set('selectedPortfolio', port);
	}.observes('portfolioController.content'),
	
  	contentLoaded: function() {
  		console.log('controller content is loaded');
  		// set default value to null so prompt is shown, not first item
  		//this.set('selectedPortfolio', null);
  	}.observes('content.isLoaded')
});

Luxin.PortfolioController = Ember.ObjectController.extend({});

Luxin.EditPortfolioController = Ember.ObjectController.extend({});