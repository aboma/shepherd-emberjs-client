Vilio.MessageView = Ember.View.extend({
    classNameBindings: ['show:message-show:message-hide'],
    templateName: 'application/message',
    show: false,

    noMessage: function() {
        var message = this.get('controller.message');
        this.set('show', (message != null));
    }.observes('controller.message')
});
