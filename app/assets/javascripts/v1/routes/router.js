Luxin.Router.map(function(match) {
	this.route("index", { path: "/" });
	this.resource('portfolios', { path: '/portfolios' }, function() {
	    this.route('new', { path: '/new' });
	    this.resource('portfolio', { path: '/:portfolio_id' }, function() {
		    this.route('show', { path: '/' });	    
		    this.route('edit', { path: '/edit' });
		    this.resource('relationships', { path: "/assets" }, function() {
		    	this.route('index', { path: "/" });
		    	this.route('new', { path: "/new" });
		    });
	    });
	});
});

Luxin.IndexRoute = Ember.Route.extend({
	enter: function() {
		console.log('hiding loading overlay');
		$('#loading').hide();
		$('#loading-overlay').hide();
	},
	redirect: function() {
	   this.transitionTo('portfolios');
	}
})

Luxin.PortfoliosRoute = Ember.Route.extend({
	model: function() {
		return Luxin.Portfolio.find();
	},
	renderTemplate: function() {
		this.render('portfolios', {
			into: 'application', 
			outlet: 'master'
		})
	}
});

Luxin.PortfoliosIndexRoute = Ember.Route.extend({
	renderTemplate: function() {
		//var controller = this.controllerFor('portfolios.index');
		this.render('portfolios.index', {  
			into: 'portfolios',
			outlet: 'master'
		});
	}
});

Luxin.PortfoliosNewRoute = Ember.Route.extend({
	model: function() {
		return this.controllerFor(this.routeName).startEditing();
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
			this.controller.save(function() {
				route.transitionTo('portfolio.show', portfolio);
			});
		}
	}
});

Luxin.PortfolioRoute = Ember.Route.extend({
	renderTemplate: function() {
		console.log('rendering portfolios.portfolio');
		this.render('portfolio', {
			into: 'portfolios',
			outlet: 'master'
		});
	}
});

Luxin.PortfolioShowRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('portfolio');
	},
	renderTemplate: function() {
		this.render('portfolio.show', {
			into: 'portfolio'
		});
	},
	redirect: function() {
		// forward to show assets route, since show portfolio
		// means show assets in portfolio to user
		this.transitionTo('relationships');	
	}
});

Luxin.PortfolioEditRoute = Ember.Route.extend({
	enter: function() {
		this.transaction = this.store.transaction();
		this.transaction.add(this.modelFor('portfolio'));
	},
	model: function() {
		return this.modelFor('portfolio');
	},
	renderTemplate: function() {
		this.render('portfolio.edit', {
			into: 'portfolio'
		});
	},
	exit: function() {
		//
	},
	events: {
		cancel : function(portfolio) {
			// clean up unused transaction
			if (this.transaction) {
				this.transaction.rollback();
				this.transaction.destroy();
			}
			this.transitionTo('portfolio.show', portfolio);
		},
		remove : function(portfolio) {
			var route = this;
			// delete portfolio and return to portfolios list
			portfolio.one('didDelete', function() {
				console.log('portfolio deleted');
				route.transitionTo('portfolios.index');
			});
			portfolio.deleteRecord();
			this.transaction.commit();
		},
		save : function(portfolio) {
			var route = this;
			// commit record if it has changed; exit function will
			// clean up unused transaction
			if (portfolio.get('isDirty')) {
				// callback will show portfolio once the id is available
				portfolio.one('didUpdate', function() {
					route.transitionTo('portfolio.show', portfolio);
				});
				this.transaction.commit();
			} else {
				this.events.cancel(portfolio);
			}
		},
	}
});

Luxin.RelationshipsRoute = Ember.Route.extend({
	// get relationships for portfolio; these contain 
	// portfolio <-> asset relationship
	model: function() {
		var id = this.modelFor('portfolio').get('id');
		return Luxin.Relationship.find({ portfolio_id: id });
	},
	renderTemplate: function() {
		this.render('relationships', {
			into: 'portfolio'
		})
	}
});

Luxin.RelationshipsNewRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('relationships.new', {
			into: 'relationships'
		});
	}
});


/*
Luxin.Router = Ember.Router.extend({
	enableLogging : true,
	location : 'hash',

	root : Ember.Route.extend({
		index : Ember.Route.extend({
			route : '/',
			//redirectsTo : 'portfolios',
			connectOutlets : function(router) {
				var ac = router.get('applicationController');
				ac.connectOutlet({
					name : 'topnav',
					outletName : 'topnav'
				});
				router.transitionTo('root.portfolios.index');
			}
		}),
		// LIST PORTFOLIOS =============================================
		portfolios : Ember.Route.extend({
			route : '/portfolios',
			initialState : 'index',
			showPortfolio : Ember.Route.transitionTo('show_portfolio'),
			createPortfolio : Ember.Route.transitionTo('new_portfolio'),
			index : Ember.Route.extend({
				route : '',
				edit : Ember.Route.transitionTo('edit_portfolio'),
				add : Ember.Route.transitionTo('add_asset'),
				connectOutlets : function(router) {
					console.log('setting up portfolios route');
					var ac = router.get('applicationController');
					var portController = router.get('portfoliosController');
					ac.connectOutlet({
						name : 'portfolios',
						outletName : 'master',
						context: Luxin.Portfolio.find()
						//context : Luxin.store.findAll(Luxin.Portfolio)
					});					
					// clear selected portfolio (needed if coming from substate)
					portController.clearSelected();
				}
			}),
			// SHOW PORTFOLIO =============================================
			show_portfolio : Ember.Route.extend({
				route : '/:id',
		        deserialize:  function(router, context){
		            return Luxin.Portfolio.find( context.id );
		        },
		        serialize:  function(router, context){
		            return {
		               id: context.id
		            }
		        },
				edit : Ember.Route.transitionTo('edit_portfolio'),
				add : Ember.Route.transitionTo('add_asset'),
				connectOutlets : function(router, portfolio) {
					console.log('showing portfolio');
					// load relationships for this portfolio and add them
					// to relationships controller
					var rc = router.get("relationshipsController");
					var rels = Luxin.Relationship.find({ portfolio_id : portfolio.id });
					rc.set('content', rels);
					var ac = router.get("applicationController");
					ac.connectOutlet({
						name : 'portfolio',
						outletName : 'detail',
						context : portfolio
					});
				},
				exit : function(router) {
					router.get('portfolioController').set('content', null);
					router.get('applicationController').disconnectOutlet("detail");
				}
			}),
			// EDIT PORTFOLIO =========================================
			edit_portfolio : Ember.Route.extend({
				route : '/:id/edit',
				transaction : null,
				deserialize : function(router, context) {
					return Luxin.Portfolio.find(context.id);
				},
				serialize : function(router, context) {
					return {
						id : context.id
					}
				},
				cancel : function(router, event) {
					// clean up unused transaction
					if (this.transaction) {
						this.transaction.rollback();
						this.transaction.destroy();
					}
					router.transitionTo('root.portfolios.show_portfolio', event.context);
				},
				remove : function(router, event) {
					var portfolio = event.context;
					// delete portfolio and return to portfolios list
					portfolio.one('didDelete', function() {
						console.log('portfolio deleted');
						router.transitionTo('root.portfolios.index');
					});
					portfolio.deleteRecord();
					this.transaction.commit();
				},
				save : function(router, event) {
					var portfolio = event.context;
					// commit record if it has changed; exit function will
					// clean up unused transaction
					if (portfolio.get('isDirty')) {
						// callback will show portfolio once the id is available
						portfolio.one('didUpdate', function() {
							router.transitionTo('root.portfolios.show_portfolio', portfolio);
						});
						this.transaction.commit();
					} else {
						this.cancel(router, event);
					}
				},
				connectOutlets : function(router, portfolio) {
					console.log('showing edit portfolio form for '
							+ portfolio.get('name'));
					this.transaction = Luxin.store.transaction();
					this.transaction.add(portfolio);
					var ac = router.get("applicationController");
					ac.connectOutlet({
						name : 'editPortfolio',
						outletName : 'detail',
						context : portfolio
					});
				},
				exit : function(router) {
					router.get("editPortfolioController").set('content', null);
					router.get("applicationController").disconnectOutlet("detail");
					console.log('exiting portfolio edit');
				}
			}),
			// NEW PORTFOLIO ======================================================
			new_portfolio : Ember.Route.extend({
				route : '/new',
				transaction : null,
				connectOutlets : function(router) {
					console.log('showing new portfolio form');
					this.transaction = Luxin.store.transaction();
					var newPortfolio = this.transaction.createRecord(Luxin.Portfolio, {});
					var ac = router.get("applicationController");
					ac.connectOutlet({
						name : 'editPortfolio',
						outletName : 'detail',
						context : newPortfolio
					});
					//TODO set selected portfolio to null without rerouting
				},
				save : function(router, event) {
					var portfolio = event.context;
					// create callback so that portfolio is shown once it is
					// created and has an id (for URL serialization)
					if (portfolio.get('isDirty')) {
						// callback will show portfolio once the id is available
						// this does not work due to ember-data bug:
						// https://github.com/emberjs/data/issues/405
						portfolio.one('didCreate', function() {
							console.log('portfolio created');
							Ember.Route.transitionTo('root.portfolios.show_portfolio', portfolio);	
						});
						this.transaction.commit();
					} else {
						this.cancel(router, event);
					}
				},
				cancel : function(router, event) {
					if (this.transaction) {
						this.transaction.rollback();
						this.transaction.destroy();
					}
					router.transitionTo('root.portfolios.index');
				},
				exit : function(router) {
					var ac = router.get("applicationController");
					ac.disconnectOutlet("detail");
				}
			}),
			// ADD ASSET ==========================================================
		    add_asset: Ember.Route.extend({
		    	route: '/:id/add',
				deserialize : function(router, context) {
					return Luxin.Portfolio.find(context.id);
				},
				serialize : function(router, context) {
					return {
						id : context.id
					}
				},
		    	transaction: null,
		    	connectOutlets: function(router, portfolio) {
		    	    console.log('showing add asset form');
		    	    console.log('showing new asset form');
		    	    var ac = router.get("applicationController");
		    	    ac.connectOutlet({ 
		    	    	name: 'newAsset', 
		    	    	outletName: 'detail', 
		    	    	context: portfolio
		    	    });
		    	},
		    	upload: function(router, event) {
		    	    var form = event.target.form;
		    	    var view = event.view;
		    	    var form_data = new FormData(form);
		    	    var uploadModel = new Luxin.Asset();
		    	    var success_callback = function(){
		    			console.log('uploaded!');
		    			router.transitionTo('root.portfolios.show_portfolio', event.context)
		    	    };
		    	    var error_callback = function() {
		    	        console.log('error uploading');
		    	    };
		    	    uploadModel.upload(form_data, success_callback, error_callback);
		    	    console.log('upload event triggered');
		    	    event.preventDefault();
	    	 	}
			})
		})
	})
});
*/