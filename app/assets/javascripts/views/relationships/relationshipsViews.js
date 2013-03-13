Vilio.RelationshipsView = Ember.View.extend({
	templateName: "relationship/relationships"
}); 

Vilio.RelationshipsNewView = Ember.View.extend({
	templateName: "relationship/new",
	
	// uploads file to server as new asset with
	// a relationship to current portfolio
    submit: function(event) {
        event.preventDefault();
        event.stopPropagation();
        var form = this.$().find('form');
        var formData = new FormData(form[0]);
        this.controller.upload(formData);
    }
});

Vilio.RelationshipsIndexView = Ember.View.extend({
	templateName: "relationship/index"
});