// select box utilizing Select2 functionality
Luxin.Select2 = Ember.Select.extend({
    defaultTemplate: Ember.Handlebars.compile('<option></option>{{#each view.content}}{{view Ember.SelectOption contentBinding="this"}}{{/each}}'),

    // initialize Select2 once view inserted in DOM
	didInsertElement : function() {
		this._super();
		var placeholderText = this.get('placeholderText');
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

// Put JQuery UI inside its own namespace
JQUI = {};

// Create a new mixin for JQuery UI widgets using the new SproutCore 2.0
// mixin syntax.
JQUI.Widget = Ember.Mixin.create({
	// When SproutCore creates the view's DOM element, it will call this
	// method.
	didInsertElement : function() {
		this._super();

		// Make JQuery UI options available as SproutCore properties
		var options = this._gatherOptions();

		// Make sure that JQuery UI events trigger methods on this view.
		this._gatherEvents(options);

		// Create a new instance of the JQuery UI widget based on its `uiType`
		// and the current element.
		var ui = jQuery.ui[this.get('uiType')](options, this.get('element'));
		// var ui = $(this.get('element'))[this.get('uiType')](options);

		// Save off the instance of the JQuery UI widget as the `ui` property
		// on this SproutCore view.
		this.set('ui', ui);
	},

	// When SproutCore tears down the view's DOM element, it will call
	// this method.
	willDestroyElement : function() {
		var ui = this.get('ui');

		if (ui) {
			// Tear down any observers that were created to make JQuery UI
			// options available as SproutCore properties.
			var observers = this._observers;
			for ( var prop in observers) {
				if (observers.hasOwnProperty(prop)) {
					this.removeObserver(prop, observers[prop]);
				}
			}
			ui._destroy();
		}
	},

	// Each JQuery UI widget has a series of options that can be configured.
	// For instance, to disable a button, you call
	// `button.options('disabled', true)` in JQuery UI. To make this compatible
	// with SproutCore bindings, any time the SproutCore property for a
	// given JQuery UI option changes, we update the JQuery UI widget.
	_gatherOptions : function() {
		var uiOptions = this.get('uiOptions'), options = {};

		// The view can specify a list of JQuery UI options that should be
		// treated
		// as SproutCore properties.
		uiOptions.forEach(function(key) {
			options[key] = this.get(key);

			// Set up an observer on the SproutCore property. When it changes,
			// call JQuery UI's `setOption` method to reflect the property onto
			// the JQuery UI widget.
			var observer = function() {
				var value = this.get(key);
				this.get('ui')._setOption(key, value);
			};

			this.addObserver(key, observer);

			// Insert the observer in a Hash so we can remove it later.
			this._observers = this._observers || {};
			this._observers[key] = observer;
		}, this);

		return options;
	},

	// Each JQuery UI widget has a number of custom events that they can
	// trigger. For instance, the progressbar widget triggers a `complete`
	// event when the progress bar finishes. Make these events behave like
	// normal SproutCore events. For instance, a subclass of JQUI.ProgressBar
	// could implement the `complete` method to be notified when the JQuery
	// UI widget triggered the event.
	_gatherEvents : function(options) {
		var uiEvents = this.get('uiEvents') || [], self = this;

		uiEvents.forEach(function(event) {
			var callback = self[event];

			if (callback) {
				// You can register a handler for a JQuery UI event by passing
				// it in along with the creation options. Update the options
				// hash
				// to include any event callbacks.
				options[event] = function(event, ui) {
					callback.call(self, event, ui);
				};
			}
		});
	}
});

// Create a new SproutCore view for the JQuery UI Button widget
JQUI.Button = Ember.View.extend(JQUI.Widget, {
	uiType : 'button',
	uiOptions : [ 'label', 'disabled' ],
	uiEvents : [ 'click' ],
	tagName : 'button'
});

// Create a new SproutCore view for the JQuery UI Menu widget (new
// in JQuery UI 1.9). Because it wraps a collection, we extend from
// SproutCore's CollectionView rather than a normal view.
//
// This means that you should use `#collection` in your template to
// create this view.
JQUI.Menu = Ember.CollectionView.extend(JQUI.Widget, {
	uiType : 'menu',
	uiOptions : [ 'disabled' ],
	uiEvents : [ 'select' ],

	tagName : 'ul',

	// Whenever the underlying Array for this `CollectionView` changes,
	// refresh the JQuery UI widget.
	arrayDidChange : function(content, start, removed, added) {
		this._super(content, start, removed, added);

		var ui = this.get('ui');
		if (ui) {
			ui.refresh();
		}
	}
});

// Create a new SproutCore view for the JQuery UI Progress Bar widget
JQUI.ProgressBar = Ember.View.extend(JQUI.Widget, {
	uiType : 'progressbar',
	uiOptions : [ 'value', 'max' ],
	uiEvents : [ 'change', 'complete' ]
});