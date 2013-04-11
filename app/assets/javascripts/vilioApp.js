$.ajaxSetup({
	beforeSend : function(xhr) {
		//xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr(
		//		'content'));
		xhr.setRequestHeader('X-API-VERSION', 'v1');
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('X-AUTH-TOKEN', auth_token);
		return xhr;
	}
});

window.Vilio = Ember.Application.create({
    //rootElement: "body",
    LOG_TRANSITIONS: true
});

// this is needed to use control handlebars template properly per
// https://github.com/emberjs/ember.js/issues/1990
Vilio.register('controller:asset', Vilio.AssetController, {singleton: false });
Vilio.register('controller:relationship', Vilio.RelationshipController, {singleton: false });
Vilio.register('controller:thumbnail', Vilio.ThumbnailController, {singleton: false });

if (!window.console) {
	window.console = {};
	window.console.log = function(object) {}
};

Vilio.TextField = Ember.TextField.extend({
	attributeBindings: ['required', 'autofocus', 'placeholderText'],
	required: null,
	autofocus: null,
	placeholderText: null
});

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