Luxin.RelationshipsView = Ember.View.extend({
	templateName: "v1/templates/relationship/relationships"
}); 

Luxin.RelationshipsNewView = Ember.View.extend({
	templateName: "v1/templates/relationship/new",
	
	// uploads file to server
    submit: function(event) {
        event.preventDefault();
        event.stopPropagation();
        var form = this.$().find('form');
        var formData = new FormData(form[0]);
        this.controller.upload(formData);
    }
});

Luxin.RelationshipsIndexView = Ember.View.extend({
	templateName: "v1/templates/relationship/index"
});