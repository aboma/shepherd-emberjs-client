// adapted from https://gist.github.com/rlivsey/2780541

// container view for modal body, header and other components
Vilio.Modal = Ember.ContainerView.extend({
	classNames: ['vilio-modal'],
	title: '',
	hasCloseButton: true,
	bodyView: Vilio.ModalBodyView,
	modal: this,
	
	/*
	childViews: (function() {
		return [modal.get('bodyView')].compact();
	})().property('bodyView'),
	*/
	
	close: function(event) {
		event.preventDefault();
		this.destroy();
	}	
});

// modal body view
Vilio.ModalBodyView = Ember.View.extend({
	 classNames: ["vilio-modal-body"],
	 contentBinding: "parentView.content",
	 defaultTemplate: Ember.Handlebars.compile('<p>Modal body</p>')
});

Vilio.Modal.reopenClass({
	display: function(options) {
		var modal = this.create(options);
		modal.appendTo('#modal-container');
		return modal;
	}
});