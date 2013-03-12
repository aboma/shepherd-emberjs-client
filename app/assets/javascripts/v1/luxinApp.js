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

window.Luxin = Ember.Application.create({
    //rootElement: "body",
    LOG_TRANSITIONS: true
});

// this is needed to use control handlebars template properly per
// https://github.com/emberjs/ember.js/issues/1990
Luxin.register('controller:asset', Luxin.AssetController, {singleton: false });

if (!window.console) {
	window.console = {};
	window.console.log = function(object) {}
};

Luxin.TextField = Ember.TextField.extend({
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