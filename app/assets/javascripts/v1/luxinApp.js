// add startWith function to string prototype
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.slice(0, str.length) == str;
	};
}

window.Luxin = Ember.Application.create();

Luxin.log = function(object) {
	debug.log(object);
}

Luxin.displayError = function(e) {
	if (typeof e === 'string') {
		// display error strings
		debug.log(e);
	} else if (typeof e === 'object' && e.responseText !== undefined) {
		// TODO - further process json errors
		debug.log(e.responseText);
	} else {
		alert("An unexpected error occurred.");
	}
};

Luxin.Message = Ember.View.extend({
	tag : 'div',
	templateName : 'v1/templates/message/message',
	type : 'alert',
	messageType : null,
	message : '',
	isVisible : false
})
