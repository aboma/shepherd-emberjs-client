// Controls messages shown to user 
Vilio.MessageController = Ember.ObjectController.extend({
    message: null,
    duration: null,
    defaultDuration: 5000,
    timer: null,

    // clear message after a duration
    timeout: function() {
        var controller = this;
        var msg = controller.get('message');
        var duration = this.get('duration') || this.get('defaultDuration');
        // if there is alreay a message with a timer, clear it
        if (this.timer) 
          clearTimeout(this.timer);

        this.timer = setTimeout(function() {
            if (controller.get('message') === msg)
                controller.set('message', null);        
        }, duration);
    }.observes('message')
});
