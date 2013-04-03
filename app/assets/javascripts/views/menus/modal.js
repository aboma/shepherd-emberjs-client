// adapted from https://gist.github.com/rlivsey/2780541

// modal body view
Vilio.ModalBodyView = Ember.View.extend({
	 classNames: ["vilio-modal-body"],
	 contentBinding: "parentView.content",
	 defaultTemplate: Ember.Handlebars.compile('<p>Modal body</p>')
});

// container view for modal body, header and other components
Vilio.ModalView = Ember.ContainerView.extend({
	classNames: ['dialog-modal'],
	title: '',
	hasCloseButton: true,
	bodyView: Vilio.ModalBodyView,
	
	childViews: function() {
		return [this.get('bodyView')].compact();
	}.property('bodyView'),
	
	close: function() {
		this.destroy();
	}	
});

Vilio.ModalView.reopenClass({
	display: function(options) {
		var modal = Vilio.ModalView.create(options);
		modal.append();
		return modal;
	}
});