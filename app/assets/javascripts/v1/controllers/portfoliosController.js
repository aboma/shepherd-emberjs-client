Luxin.PortfoliosController = Ember.ArrayController.extend({
	sortProperties: ['name'],
	sortAscending: true, 
	selectedPortfolio: null,
/*	portfolioNameFilter: '',
	
  	filteredPortfolios: function() {
  		var content = this.get('arrangedContent'),
  			x = content,
  			value = this.get('portfolioNameFilter');		
  		if (value && value.length > 3)
  			x =  x.filter(function(item, index, enumerable) {
  				if (item.get('name').toLowerCase().startsWith(value.toLowerCase()))
  					return true;
  				return false;
  			});
  		return x;
  	}.property('arrangedContent.@each.name', 'portfolioNameFilter').cacheable(),
 */
  	replaceContent: function() {
  		Luxin.log('controller content is loaded');
  	}.observes('content.isLoaded')
});

Luxin.PortfolioController = Ember.ObjectController.extend({});

Luxin.EditPortfolioController = Ember.ObjectController.extend({});