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