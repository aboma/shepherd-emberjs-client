Vilio.RelationshipsView = Ember.View.extend({
	templateName: "relationship/relationships"
}); 

Vilio.RelationshipsNewView = Ember.View.extend({
	templateName: "relationship/new",

	// uploads file to server as new asset with
	// a relationship to current portfolio
    submit: function(event) {
    	console.log('submitting new asset/relationship');
        event.preventDefault();
        event.stopPropagation();
        var form = this.$().find('form');
        if (form[0])
        	var formData = new FormData(form[0]);
        if(formData) {
        	var router = this.controller.target;
        	var success = function() {
        		router.transitionTo('relationships.index');
        	};
        	var error = function(xhr) {
        		//TODO show message
        	};
        	this.controller.upload(formData, success, error);
        }
    }
});

Vilio.RelationshipsIndexView = Ember.View.extend({
	templateName: "relationship/index"
});

Vilio.RelationshipModalView = Ember.View.extend({
	layoutName : 'layouts/modal',
	templateName : 'relationship/edit',

	close: function() {
		this.destroy();
	},

	removeFromPortfolio: function() {
		var view = this;
        //TODO make this call a promise
		this.controller.removeRelationship(function() {
			view.close();			
		});
	}
});

Vilio.RelationshipView = Ember.ContainerView.extend({
    childViews: ['relationshipShow'],
	relationshipModalView: null,

    relationshipShow: Em.View.extend({
        templateName : 'relationship/show'
    }),

	click: function() {
		console.log("relationship view clicked");
		this.showRelationshipModalView();
	},

	close: function() {
		this.closeModalView();
	},

	closeModalView: function() {
		if (this.relationshipModalView) {
            this.removeObject(this.relationshipModelView);
			this.relationshipModalView.close();
            this.relationshipModalView = null;
        }
	},

	// open modal view of relationship to show all
	// details
	showRelationshipModalView: function() {
		this.closeModalView();
		this.relationshipModalView = Vilio.RelationshipModalView.create({
			controller: this.controller,
			baseView: this,
            container: this.get('container')
		});
		this.pushObject(this.relationshipModalView);		
	}
});
