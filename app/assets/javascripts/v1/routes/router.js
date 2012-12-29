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
						context : Luxin.store.findAll(Luxin.Portfolio)
					});					
					// clear selected portfolio (needed if coming from substate)
					portController.clearSelected();
					// bind change in selected portfolio to trigger routing 
					// to show portfolio or portfolio list if null
					if (!portController.hasObserverFor('selectedPortfolio')) {
						portController.addObserver('selectedPortfolio', function() {
							console.log('selected portfolio changed to ' + this.get('selectedPortfolio.name'));
							var portfolio = this.get('selectedPortfolio');
							if (portfolio)
								router.transitionTo('root.portfolios.show_portfolio', portfolio);
							else
								router.transitionTo('root.portfolios.index');
						});
					}
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

// start app
Luxin.initialize();