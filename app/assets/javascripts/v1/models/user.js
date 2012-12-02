Luxin.User = Ember.Object.extend({
	email: null,
	last_name: null,
	first_name: null,
	hasAdminRights: false,
	
	init: function() {
		this._super();

	}	
})
