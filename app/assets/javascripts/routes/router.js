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
Vilio.ApplicationRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        // load user session information
        var sessionController = this.controllerFor('session');
        sessionController.set('model', Vilio.Session.find(1));
        // load application settings
        var settingController = this.controllerFor('setting');
        settingController.set('model', Vilio.Setting.find(1));
        // load values lists for forms
        var metadataValuesListsController = this.controllerFor('metadata_lists');
        if (metadataValuesListsController) 
          metadataValuesListsController.set('model', Vilio.MetadataValuesList.find({}));
        // load fields
        var metadataFieldsController = this.controllerFor('fields');
        if (metadataFieldsController)
          metadataFieldsController.set('model', Vilio.MetadataField.find({}));
        // load metadata templates
        var metadataTemplatesController = this.controllerFor('templates'); 
        if (metadataTemplatesController)
          metadataTemplatesController.set('model', Vilio.MetadataTemplate.find());

        Vilio.loadingOverlay.hide();
        this._super(controller, model);
    }
});

Vilio.IndexRoute = Ember.Route.extend({
	redirect: function() {
	   this.transitionTo('portfolios');
	}
});

Vilio.AssetsRoute = Ember.Route.extend({});

Vilio.AssetsIndexRoute = Ember.Route.extend({
	model: function() {
		return Vilio.Asset.find();
	},
    events: {
        editAsset: function(asset) {
            this.controller.setSelected(asset);
        }
    }
});
