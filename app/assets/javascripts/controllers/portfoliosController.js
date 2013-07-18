Vilio.PortfoliosIndexController = Ember.ObjectController.extend({});

Vilio.PortfoliosController = Ember.ArrayController.extend({
	needs: ['portfolio'],
	content: null,
	sortProperties: ['name'],
	sortAscending: true,
	selectedBinding: Ember.Binding.oneWay("controllers.portfolio.content"),

    savedSortedContent: function() {
        return this.get('arrangedContent').filterProperty('isNew', false);
    }.property('content.@each'),

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
  needs: ['portfolio', 'templates'],
  uri: Ember.computed.alias('controllers.portfolio.uri'),
  metadataTemplates: Ember.computed.alias('controllers.templates.content')
});

Vilio.PortfoliosNewController = Vilio.PortfolioEditController.extend({});
