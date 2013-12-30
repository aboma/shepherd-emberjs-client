Shepherd.PortfoliosIndexController = Ember.ObjectController.extend({});

Shepherd.PortfoliosController = Ember.ArrayController.extend({
	needs: ['portfolio'],
	content: null,
	sortProperties: ['name'],
	sortAscending: true,
	selectedBinding: Ember.Binding.oneWay("controllers.portfolio.content"),

    savedSortedContent: function() {
        return this.get('arrangedContent').filter(function(item) {
            return item.get('isNew') === false;
        });
    }.property('content.@each.isNew'),

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

Shepherd.PortfolioController = Ember.ObjectController.extend(Shepherd.ResourceControllerMixin, {});

Shepherd.PortfolioShowController = Ember.ObjectController.extend({});

Shepherd.PortfolioEditController = Ember.ObjectController.extend(Shepherd.EditModelControllerMixin, {
    needs: ['portfolio', 'templates'],
    uri: Ember.computed.alias('controllers.portfolio.uri'),
    metadataTemplates: Ember.computed.alias('controllers.templates.content')
});

Shepherd.PortfoliosNewController = Shepherd.PortfolioEditController.extend({});
