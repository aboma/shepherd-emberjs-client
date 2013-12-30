// Attach API version and authorization token to header of AJAX request
Ember.$.ajaxPrefilter(function(options ,originalOptions, xhr) {
	//xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr(
	//		'content'));
	xhr.setRequestHeader('X-API-VERSION', 'v1');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('X-AUTH-TOKEN', auth_token);
    // set cross-domain XHR fields to allow cross-domain AJAX requests
    // with credentials (cookies)
    options.crossDomain = {
        crossDomain: true
    };
    options.xhrFields = {
        withCredentials: true
    };
    // enable browser to receive cookies from cross-domain requests
	return xhr;
});

Ember.run.backburner.DEBUG = true;

window.Shepherd = Ember.Application.create({
    //rootElement: "body",
    LOG_TRANSITIONS: true
   // LOG_TRANSITIONS_INTERNAL: true
});

Ember.RSVP.configure('onerror', function(error) {
    Ember.Logger.assert(false, error);
});

if (!window.console) {
	window.console = {};
	window.console.log = function() {};
}


Shepherd.TextField = Ember.TextField.extend({
	attributeBindings: ['required', 'placeholderText'],
	required: false,
	autofocus: null,
	placeholderText: null,

    didInsertElement: function() {
        this.$().focus();
    }
});

Shepherd.Checkbox = Ember.View.extend({
    defaultTemplate: Ember.Handlebars.compile('<div class="shepherd-checkbox"><input type="checkbox" {{bind-attr checked="view.checked" disabled="view.disabled"}}/><div for="shepherd-checkbox"></div></div>'),

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

Shepherd.Button = Ember.View.extend(Ember.TargetActionSupport, {
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

Shepherd.SaveButton = Shepherd.Button.extend({
    classNames: ['btn-success'], 
    action: 'save',
    attributeBindings: ['disabled'],
    //disabled: !Ember.Binding.oneWay('content.isDirty'),
    disabled: function() {
/*      console.log('content isDirty: ' + this.get('content.isDirty'));
        console.log('content isSaving: ' + this.get('content.isSaving'));
        var relationDirty = false;
        var content = this.get('content');
        content.eachRelationship(function(name, rel) {
            if (rel.kind === 'hasMany') {
                relationDirty = relationDirty || content.get(rel.key + '.isDirty');
            }
        });
        return !this.get('content.isDirty') || this.get('content.isSaving') || relationDirty;
        */
        return false;
    }.property('content.isDirty', 'content.isSaving')
});

Shepherd.CancelButton = Shepherd.Button.extend({
    classNames: ['btn-warning'],
    action: 'cancel'
});

Shepherd.DeleteButton = Shepherd.Button.extend({
    classNames: ['btn-danger'],
    action: 'remove',
    disabled: function() {
        return this.get('content.isSaving');
    }.property('content.isSaving')
});

Shepherd.loadingOverlay = {
    hide : function() {
        console.log('hiding loading overlay');
        $('#loading').hide();
        $('#loading-overlay').hide();
    }	
};
