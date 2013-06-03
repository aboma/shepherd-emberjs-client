// select box utilizing Select2 functionality
Vilio.Select2 = Ember.Select.extend({
    defaultTemplate: Ember.Handlebars.compile('<option></option>{{#each view.content}}{{view Ember.SelectOption contentBinding="this"}}{{/each}}'),

    // initialize Select2 once view is inserted in DOM
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

    willDestroyElement : function() {
      console.log('destroying select2');
        this.$().select2('destroy');
    },

	// when data is loaded, update select2 to show
	// this data
	itemsLoaded : function() {
		console.log('select2 items loaded');
		Ember.run.sync();
		// trigger change event on selectbox once data
		// has been loaded to update options values
		Ember.run.next(this, function() {
			console.log('updating select2 options list');
			// trigger change event on select2
			if (this.$())
              this.$().change();
		});
	}.observes('controller.content.isLoaded'),

	setSelectedValue: function(value) {
		console.log('setting select2 selected value to ' + value);
		this.$().select2('val', value);		
	},

	// observe controller selected content and update select2
	// selected item if selected item is changed on the 
	// controller and does not match currently selected value;
	// this occurs when the selected value is changed outside of
	// the control; must wait until next ember run since 
	// it seems that after create, a new item is not yet available
	// in the list to be selected
	setSelected : function() {
		var path = this.get('optionValuePath');
		var s = path.split('.');
		var fieldname = s[s.length-1];
		var fieldvalue = '';
		var selected = this.get('controller.selected');
		var sel2Val = this.$().select2('val');
		if (selected) fieldvalue = selected.get(fieldname);
		if (sel2Val !== fieldvalue || fieldvalue == '') {
			Ember.run.sync();
			// trigger change event on selectbox once data
			// has been loaded to update options values
			Ember.run.next(this, function() {
				this.setSelectedValue(fieldvalue);
			});
		}
	}.observes('controller.selected')
});
