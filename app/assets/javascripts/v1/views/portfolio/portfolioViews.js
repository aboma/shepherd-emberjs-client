Luxin.PortfoliosView = Ember.View.extend({
  	templateName: 'v1/templates/portfolio/list',
  	filteredPortfolios: null,
    
  	init: function() {
  		Luxin.log('initializing portfolios list view');
    	this._super();
  	},
  	updateFilter: function() {
  		var value = this.get('portfolioFilter.value');
  		this.get('controller').set('portfolioNameFilter', value);
  	}.observes('portfolioFilter.value')
});

Luxin.PortfolioView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/show'
});

Luxin.EditPortfolioView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/edit',
	
	didInsertElement: function() {
		this._super();
	   	this.$('input:first').focus();  	
	}
});