Luxin.PortfoliosIndexController = Ember.ObjectController.extend({});

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

Luxin.PortfolioShowController = Ember.ObjectController.extend({
	selectedPortfolio: null,
});

Luxin.PortfolioEditController = Ember.ObjectController.extend({
	startEditing: function(model) {
		this.transaction = this.store.transaction();
		if (model)
			this.transaction.add(model);
		else
			model = this.transaction.createRecord(Luxin.Portfolio, {});
		
		return model;			
	},
	save: function(callback) {
		// commit record if it has changed; exit function will
		// clean up unused transaction
		var portfolio = this.get('content');
		if (portfolio.get('isDirty')) {
			// callback will show portfolio once the id is available
			portfolio.one('didUpdate', function() {
				if (callback && typeof callback === 'function'){
					callback.call(this);
				}
			});
			// trigger save
			this.transaction.commit();
		} else {
			this.stopEditing();
			if (callback && typeof callback === 'function'){
				callback.call(this);
			}
		}
	},
	remove: function(callback) {
		// delete portfolio and return to portfolios list
		var portfolio = this.get('content');
		portfolio.one('didDelete', function() {
			console.log('portfolio deleted');
			if (callback && typeof callback === 'function'){
				callback.call(this);
			}
		});
		portfolio.deleteRecord();
		this.transaction.commit();
	},
	stopEditing: function(callback) {
		// clean up unused transaction
		if (this.transaction) {
			this.transaction.rollback();
			this.transaction.destroy();
		}
		if (callback && typeof callback === 'function'){
			callback.call(this);
		}
	}
});

Luxin.PortfoliosNewController = Luxin.PortfolioEditController.extend({});