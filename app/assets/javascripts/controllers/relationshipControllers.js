Shepherd.RelationshipsController = Ember.ArrayController.extend({	
    needs: ['portfolio'],

    // reload selected portfoli to include uploaded relationship
    reloadContent: function() {
		var id = this.get('controllers.portfolio.content.id');
        console.log('reloading relationships for portfolio ' + id);
		this.set('content', this.store.find('portfolio', id));
    },

	// broken per https://github.com/emberjs/data/issues/587
	empty: function() {
		var numOfAssets = this.get('content.length');
		return numOfAssets === 0;
	}.property('content.length')
});

Shepherd.RelationshipsIndexController = Ember.ArrayController.extend({});

Shepherd.RelationshipController = Ember.ObjectController.extend(Shepherd.EditModelControllerMixin, {
    needs: ['portfolios', 'relationshipsNew'],
    portfolioToAddTo: null,

    // list of portfolios that this asset does not have a relationship
    // with and can be added to by this user
    availablePortfolios: function() {
        console.log('getting available portfolios');
        var ports =  this.get('controllers.portfolios.content');
        var assetPorts = this.get('content.asset.portfolios');
        var availablePorts = [];
        if (assetPorts) {
            var arrays = [ports.toArray(), assetPorts.toArray()]
            availablePorts = arrays.shift().filter(function(v) {
                return arrays.every(function(a) {
                    return a.indexOf(v) === -1;
                });
            });
        }
        return availablePorts;
    }.property('content.asset.portfolios'),

    // array of portfolios that asset does not have
    // a relationship with, and hencea relationship can be
    // created with
    hasAvailablePortfolios: function() {
       return this.get('availablePortfolios.length') > 0;
    }.property('content.asset.portfolios'),

    actions: {
        // add asset to another portfolio
        addToPortfolio: function() {
            console.log('adding to portfolio');
            var portfolio = this.get('portfolioToAddTo');
            var asset = this.get('content.asset');
            this.get('controllers.relationshipsNew').create(asset, portfolio);
        }
    }
});

Shepherd.RelationshipEditController = Shepherd.RelationshipController.extend({});

Shepherd.RelationshipsNewController = Ember.ObjectController.extend(Shepherd.EditModelControllerMixin, {
	needs: ['portfolio'],

	portfolio: function() {
		return this.get('controllers.portfolio.content.id');
	}.property('controllers.portfolio.content'),

    create: function(asset, portfolio) {
		var relationship = this.store.createRecord('relationship', {
            asset: asset,
            portfolio: portfolio
        });
        portfolio.get('relationships').pushObject(relationship);
        this.set('content', relationship);
        this.saveEdits().then(function() {
            console.log('relationship created');
        });
    }
});

