Vilio.Router.map(function(match) {
	this.route("index", { path: "/" });
	// portfolios
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
    this.resource('fields', { path: '/fields' }, function() {
      this.route('new', { path: '/new' });
      this.resource('field', { path: '/:field_id' }, function() {
        this.route('show', { path: '/show' });
        this.route('edit', { path: '/edit' });
      });
    });
    this.resource('metadata_lists', { path: '/metadata_lists' }, function() {
      this.route('new', { path: '/new' });
      this.resource('metadata_list', { path: '/:metadata_list_id' }, function() {
        this.route('show', { path: '/show' });
        this.route('edit', { path: '/edit' });
      });
    });
	// assets (outside of relationships)
	this.resource('assets', { path: '/assets'}, function() {
		this.resource('asset', { path: '/:asset_id' }, function() {
			this.route('show', { path: '/' });
		});
	});
});

// load application settings and remove loading graphic
Vilio.ApplicationRoute = Ember.Route.extend({
    setupController: function() {
        var settingController = this.controllerFor('setting');
        settingController.set('model', Vilio.Setting.find(1));
        Vilio.loadingOverlay.hide();
    }
});

Vilio.IndexRoute = Ember.Route.extend({
	redirect: function() {
	   this.transitionTo('portfolios');
	}
});

Vilio.RelationshipsRoute = Ember.Route.extend({
	// get relationships for portfolio; these contain 
	// portfolio <-> asset relationship
	model: function() {
		var id = this.modelFor('portfolio').get('id');
		return Vilio.Relationship.find({ portfolio_id: id });
	},
	renderTemplate: function() {
		this.render('relationships', {
			into: 'portfolios',
			outlet: 'detail'
		})
	}
});


Vilio.RelationshipsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('relationships');
	},
	renderTemplate: function() {
		this.render('relationships.index', {
			into: 'relationships'
		});
	}
});

Vilio.RelationshipsNewRoute = Ember.Route.extend({
	model: function() {
		var transaction = this.store.transaction();
		this.controllerFor(this.routeName).startEditing(transaction);
		return transaction.createRecord(Vilio.Asset, {});
	},
	renderTemplate: function() {
		this.render('relationships.new', {
			into: 'relationships'
		});
	}
});

Vilio.AssetsRoute = Ember.Route.extend({});

Vilio.AssetsIndexRoute = Ember.Route.extend({
	model: function() {
		return Vilio.Asset.find();
	}
});


/*
Vilio.Router = Ember.Router.extend({
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
						context: Vilio.Portfolio.find()
						//context : Vilio.store.findAll(Vilio.Portfolio)
					});					
					// clear selected portfolio (needed if coming from substate)
					portController.clearSelected();
				}
			}),
			// SHOW PORTFOLIO =============================================
			show_portfolio : Ember.Route.extend({
				route : '/:id',
		        deserialize:  function(router, context){
		            return Vilio.Portfolio.find( context.id );
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
					var rels = Vilio.Relationship.find({ portfolio_id : portfolio.id });
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
					return Vilio.Portfolio.find(context.id);
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
					this.transaction = Vilio.store.transaction();
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
					this.transaction = Vilio.store.transaction();
					var newPortfolio = this.transaction.createRecord(Vilio.Portfolio, {});
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
					return Vilio.Portfolio.find(context.id);
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
		    	    var uploadModel = new Vilio.Asset();
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
