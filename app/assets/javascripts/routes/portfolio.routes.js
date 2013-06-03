Vilio.PortfoliosRoute = Ember.Route.extend({
	model: function() {
		return Vilio.Portfolio.find();
	}
});

Vilio.PortfoliosIndexRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('portfolios.index', {  
			into: 'portfolios',
			outlet: 'master'
		});
	},
	activate: function() {
		// make sure no portfolio is selected
		this.controllerFor('portfolios').clearSelected();
	}
});

Vilio.PortfoliosNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		this.controllerFor(this.routeName).startEditing(transaction);
		return transaction.createRecord(Vilio.Portfolio, {});
	},
	renderTemplate: function() {
		this.render('portfolios.new', {
			into: 'portfolios',
			outlet: 'master'
		});
	},
	events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('portfolios.index');
		},
		save: function() {
			var route = this;
			this.controller.saveEdits(function() {
				console.log('portfolio created');
				route.transitionTo('portfolio.show', route.controller.get('content'));
			});
		}
	}
});

Vilio.PortfolioRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('portfolio', {
			into: 'portfolios',
			outlet: 'master'
		});
	}
});

Vilio.PortfolioShowRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('portfolio.show', {
			into: 'portfolio'
		});
		// forward to show assets route, since show portfolio
		// means show assets in portfolio to user
		this.transitionTo('relationships');
	}
});

Vilio.PortfolioEditRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('portfolio');
	},
	// create transaction and add model to it
	setupController: function(controller, model) {
        this._super(controller, model);
		var transaction = this.store.transaction();
		transaction.add(model);
		controller.startEditing(transaction);
	},
	renderTemplate: function() {
		this.render('portfolio.edit', {
			into: 'portfolios',
			outlet: 'detail'	
		});
	},
	events: {
		cancel: function() {
			this.controller.stopEditing();
			this.transitionTo('portfolio.show', this.controller.get('content'));
		},
		save: function() {
			var route = this;
			this.controller.saveEdits(function() {
				console.log('portfolio saved');
				route.transitionTo('portfolio.show', route.controller.get('content'));
			});
		},
		remove : function(portfolio) {
			var route = this;
			this.controller.deleteRecord(function(){
				console.log('portfolio deleted');
				route.transitionTo('portfolios');
			});
		}
	}
});

