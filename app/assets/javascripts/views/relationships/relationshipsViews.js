Vilio.RelationshipsView = Ember.View.extend({
	templateName: "relationship/relationships"
}); 

Vilio.RelationshipsNewView = Ember.View.extend({
	templateName: "relationship/relationshipNew",

	// uploads file to server as new asset with
	// a relationship to current portfolio
    submit: function(event) {
    	console.log('submitting new asset/relationship');
        event.preventDefault();
        var formData;
        var form = this.$().find('form');
        if (form[0])
        	formData = new FormData(form[0]);
        if(formData) {
        	var router = this.controller.target;
            event.formData = formData;
            // send event to submit data to route
            router.send('create', event);
         }
    }
});

Vilio.RelationshipsIndexView = Ember.View.extend({
	templateName: "relationship/relationshipsIndex"
});

Vilio.RelationshipModalView = Ember.View.extend({
	layoutName : 'layouts/modal',
	templateName : 'relationship/relationshipEdit',
});

Vilio.RelationshipView = Ember.ContainerView.extend({
    childViews: ['relationshipShow'],
	relationshipModalView: null,

    relationshipShow: Em.View.extend({
        templateName : 'relationship/relationshipShow'
    }),

    selectionChanged: function() {
        if (this.get('controller.isSelected')) {
		    this.showRelationshipModalView();
        } else {
            this.closeModalView();
        }
    }.observes('controller.isSelected'),

    closeModalView: function() {
		if (this.relationshipModalView) {
            this.removeObject(this.relationshipModalView);
			this.relationshipModalView.destroy();
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
