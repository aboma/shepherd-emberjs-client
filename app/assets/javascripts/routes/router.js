Shepherd.Router.map(function(match) {
	this.route("index", { path: "/" });
	// portfolios
	this.resource('portfolios', { path: '/portfolios' }, function() {
	    this.route('new', { path: '/new' });
	    this.resource('portfolio', { path: '/:portfolio_id' }, function() {
		    this.route('show', { path: '/' });	    
		    this.route('edit', { path: '/edit' });
		    this.resource('relationships', { path: "/relationships" }, function() {
		    	this.route('index', { path: "/" });
                this.route('new', { path: "/new" });
		        this.resource('relationship', { path: "/:relationship_id" }, function() {
                    this.route('edit', { path: "/edit" });
                });
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
    this.resource('templates', { path: 'templates' }, function() {
      this.route('new', { path: '/new' });
      this.resource('template', { path: '/:template_id' }, function() {
         this.route('show', { path: '/show' });
        this.route('edit', { path: '/edit' });
      });    
    });
    this.resource('metadata_lists', { path: '/metadata-lists' }, function() {
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
			this.route('modalEdit', { path: '/edit' });
		});
	});
    this.resource('users', { path: '/users' }, function() {
        this.route('new', { path: '/new' });
        this.resource('user', { path: '/:user_id' }, function() {
            this.route('show', { path: '/' });
            this.route('edit', { path: '/edit' });
        });
    });
});

// load application settings and remove loading graphic
Shepherd.ApplicationRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        // load user session information
        var sessionController = this.controllerFor('session');
        sessionController.set('model', this.store.find('session', 1));
        // load application settings
        var settingController = this.controllerFor('setting');
        settingController.set('model', this.store.find('setting', 1));
        // load values lists for forms
        var metadatumValuesListsController = this.controllerFor('metadata_lists');
        if (metadatumValuesListsController) 
          metadatumValuesListsController.set('model', this.store.find('metadatumValuesList'));
        // load fields
        var metadatumFieldsController = this.controllerFor('fields');
        if (metadatumFieldsController)
          metadatumFieldsController.set('model', this.store.find('metadatumField'));
        // load metadata templates
        var metadataTemplatesController = this.controllerFor('templates'); 
        if (metadataTemplatesController)
          metadataTemplatesController.set('model', this.store.find('metadataTemplate'));

        Shepherd.loadingOverlay.hide();
        this._super(controller, model);
    }
});

Shepherd.IndexRoute = Ember.Route.extend({
	redirect: function() {
	   this.transitionTo('portfolios');
	}
});
