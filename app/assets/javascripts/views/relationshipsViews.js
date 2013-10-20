Shepherd.RelationshipsView = Ember.View.extend({
	templateName: "relationship/relationships"
}); 

Shepherd.RelationshipsNewView = Ember.View.extend({
	layoutName : 'layouts/modal',
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

Shepherd.RelationshipsIndexView = Ember.View.extend({
	templateName: "relationship/relationshipsIndex"
});

Shepherd.RelationshipEditView = Ember.View.extend({
	layoutName : 'layouts/modal',
	templateName : 'relationship/relationshipEdit'
});

Shepherd.RelationshipView = Ember.View.extend({
	templateName : 'relationship/relationshipShow'
});
