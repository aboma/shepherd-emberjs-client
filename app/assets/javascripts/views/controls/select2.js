// select box utilizing Select2 functionality
Vilio.Select2 = Ember.Select.extend({
    defaultTemplate: Ember.Handlebars.compile('<option></option>{{#each view.content}}{{view Ember.SelectOption contentBinding="this"}}{{/each}}'),

    // initialize Select2 once view inserted in DOM
	didInsertElement : function() {
		//this._super();
		var placeholderText = this.get('placeholderText');
		if (!this.$().select2)
			throw new Exception('select2 is required for Vilio.Select2 control');
		if (!placeholderText)
			this.set('placeholderText', '');
		this.$().select2({
			containerCssClass: 'select2-portfolio',
			placeholder: placeholderText,
			allowClear: true
		});
	},
	
	// respond to load of data through binding
	itemsLoaded : function() {
		console.log('select2 items loaded');
		Ember.run.sync();
		// trigger change event on selectbox once data
		// has been loaded to update options values
		Ember.run.next(this, function() {
			console.log('updating select2 options list');
			// trigger change event on select2
			this.$().change();
		});
	}.observes('controller.content.isLoaded')
});