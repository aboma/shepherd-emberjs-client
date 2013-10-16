Vilio.RelationshipsController = Ember.ArrayController.extend({	
    // relationship selected from the list
    selectedRelationship: null,

	// broken per https://github.com/emberjs/data/issues/587
	empty: function() {
		var numOfAssets = this.get('content.length');
		return numOfAssets === 0;
	}.property('content.length')
});

Vilio.RelationshipsIndexController = Ember.ArrayController.extend({});

Vilio.RelationshipController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
    needs: ['relationshipsIndex', 'portfolios', 'relationshipsNew'],
    portfolioToAddTo: null,

    destroyRelationship: function(relationship) {
        var controller = this;
        this.deleteRecord().then(function() {
            controller.transitionTo('relationships.index');
        }, function() {
            //TODO handle error
        });
    },
    removeFromPortfolio: function(relationship) {
        this.destroyRelationship(relationship);
    },
    // list of portfolios that this asset does not have a relationship
    // with and can be added to by this user
    availablePortfolios: function() {
        console.log('getting available portfolios');
        var ports =  this.get('controllers.portfolios.content');
        var assetPorts = this.get('content.asset.portfolios');
        var availablePorts = [];
        if (assetPorts) {
            availablePorts = ports.removeObjects(assetPorts);
        }
        return availablePorts;
    }.property('portfolios.content', 'content'),
    hasAvailablePortfolios: function() {
       return this.get('availablePortfolios.length') > 0;
    }.property('content', 'portfolios.content'),
    addToPortfolio: function() {
        console.log('adding to portfolio');
        var portfolio = this.get('portfolioToAddTo');
        var asset = this.get('content.asset');
        this.get('controllers.relationshipsNew').create(asset, portfolio);
    }
});

Vilio.RelationshipEditController = Vilio.RelationshipController.extend({});

Vilio.RelationshipsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
	needs: ['portfolio'],

	portfolio: function() {
		return this.get('controllers.portfolio.content.id');
	}.property('controllers.portfolio.content'),

    create: function(asset, portfolio) {
		var relationship = this.store.transaction().createRecord(Vilio.Relationship);
        relationship.set('asset', asset);
        relationship.set('portfolio', portfolio);
        portfolio.get('relationships').pushObject(relationship);
        this.set('content', relationship);
        this.saveEdits().then(function() {
            console.log('relationship created');
        });
    }
});

