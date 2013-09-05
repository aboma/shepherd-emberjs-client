// Attach API version and authorization token to header of AJAX request
Ember.$.ajaxPrefilter(function(options ,originalOptions, xhr) {
	//xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr(
	//		'content'));
	xhr.setRequestHeader('X-API-VERSION', 'v1');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('X-AUTH-TOKEN', auth_token);
	return xhr;
});

window.Vilio = Ember.Application.create({
    //rootElement: "body",
    LOG_TRANSITIONS: true
});

// this is needed to use control handlebars template properly per
// https://github.com/emberjs/ember.js/issues/1990
Vilio.register('controller:asset', Vilio.AssetController, { singleton: false });
Vilio.register('controller:relationship', Vilio.RelationshipController, { singleton: false });
Vilio.register('controller:thumbnail', Vilio.ThumbnailController, { singleton: false });

if (!window.console) {
	window.console = {};
	window.console.log = function(object) {}
};

Vilio.TextField = Ember.TextField.extend({
	attributeBindings: ['required', 'placeholderText'],
	required: false,
	autofocus: null,
	placeholderText: null,

    didInsertElement: function() {
      this.$().focus();
    }
});

Vilio.Checkbox = Ember.View.extend({
  defaultTemplate: Ember.Handlebars.compile('<div class="vilio-checkbox"><input type="checkbox" {{bindAttr checked="view.checked" disabled="view.disabled"}}/><div for="vilio-checkbox"></div></div>'),

  checked: null,
  disabled: false,

  init: function() {
    this._super();
    this.on("change", this, this.click);
  },

  click: function() {
      this.set('checked', !this.get('checked'));
  }
});

Vilio.Button = Ember.View.extend(Ember.TargetActionSupport, {
    tagName: 'button',
    classNames: ['btn'],
    content: Ember.computed.alias('controller.content'),
    target: Ember.computed.alias('controller.target'),
    actionContext: Ember.computed.alias('context'),
    click: function(){
      this.triggerAction(); // Sends the `save` action, along with the current context
                            // to the target
    }
});

Vilio.SaveButton = Vilio.Button.extend({
    classNames: ['btn-success'], 
    attributeBindings: ['disabled'],
    //disabled: !Ember.Binding.oneWay('content.isDirty'),
    disabled: function() {
        return !this.get('content.isDirty') || this.get('content.isSaving');
    }.property('content.isDirty', 'content.isSaving').cacheable(),

    action: 'save'
});

Vilio.CancelButton = Vilio.Button.extend({
    classNames: ['btn-warning'],
    action: 'cancel'
});

Vilio.DeleteButton = Vilio.Button.extend({
    classNames: ['btn-danger'],
    action: 'remove',
    disabled: function() {
        return this.get('content.isSaving');
    }.property('content.isSaving').cacheable(),
});

Vilio.loadingOverlay = {
    hide : function() {
      console.log('hiding loading overlay');
      $('#loading').hide();
      $('#loading-overlay').hide();
    }	
}

Handlebars.registerHelper("debug", function(optionalValue) {
	  console.log("Current Context");
	  console.log("====================");
	  console.log(this);

	  if (optionalValue) {
	    console.log("Value");
	    console.log("====================");
	    console.log(optionalValue);
	  }
});
