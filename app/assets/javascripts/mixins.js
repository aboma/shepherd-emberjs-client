Vilio.ResourceControllerMixin = Ember.Mixin.create({
  uri: function() {
    var links = this.get('content.links');
    if (!links) return null;
    var link = links.findProperty('rel', 'self');
    if (!link) return null;
    return link.get('href');
  }.property('content.links')
});

// Mixin to generalize model create/edit functionality
// for use in controllers. Typical use in route:
Vilio.EditModelControllerMixin = Ember.Mixin.create({
    needs:['message'],

	// works for both save and edit by inspecting record states
	// commit record if it has changed; returns promise of 
    // record create or update
	saveEdits: function(record) {
        var controller = this,
            msgController = this.get('controllers.message');
		if (!record) record = this.get('content');
        return new Em.RSVP.Promise(function(resolve, reject) {
            // reset transaction if user wants to resubmit record
            // that is invalid or in error state
            if (!record.get('isValid') || record.get('isError')) {
                this.resetRecordState();
            }
            if (!record.get('isDirty')) {
                msgController.set('message', 'no changes to save in model');
                resolve(record);
                return;
            }
            msgController.set('message', 'saving record');
    	    var method = record.get('isNew') === true ? 'didCreate' : 'didUpdate';
    		// callback will show record once the id is available
	   		record.one(method, controller, function() {
                msgController.set('message', 'record saved');
                if (method === 'didUpdate') {
                    // resolve promise
                    resolve(record);
                } else {
                    // observe for when id is created since we may need this
                    // for transition
	    	        record.addObserver('id', this, resolve);
                }
	    	});
            var errorHandler = function() {
                var type = this.get('content.isError') ? 'error' : 'problem';
                msgController.set('message', type + ' saving record');
                // reject promise
                reject(record);
            }
            // callback for invalid or conflict response from server
            record.one('becameInvalid', controller, errorHandler);
            record.one('becameError', controller, errorHandler);
	    	// trigger save
		    record.get('transaction').commit();
        });
	},
	// returns promise to delete resource
	deleteRecord: function(record) {
    	var controller = this,
            msgController = this.get('controllers.message');
        if (!record) record = this.get('content');
        return new Em.RSVP.Promise(function(resolve, reject) {
            msgController.set('message', 'deleting record');
	    	record.one('didDelete', controller, function() {
                msgController.set('message', 'record deleted');
                resolve();
	    	});
            record.one('didError', controller, function() {
                msgController.set('message', 'error deleting record');
                reject(record);
            });
		    record.deleteRecord();
    		controller.get('content.transaction').commit();
        });
	},
	stopEditing: function(callback) {
        var controller = this;
        return new Em.RSVP.Promise(function(resolve, reject) {
            var content = controller.get('content');
            if (!content.get('isValid')) {
                content.send('becameValid');
            }
            controller.get('content.transaction').rollback();
            if (content.get('isNew')) {
                content.deleteRecord();
            }
            resolve();
        });
	},
    // enable transaction to be submitted again
    resetRecordState: function() {
        var record = this.get('content');
        var state = record.get('id') ? 'loaded.updated.uncommitted' : 'loaded.created.uncommited';
        record.get('stateManager').transitionTo(state);
    }
});

// View mixin to create and control modal view that will
// be opened when user clicks on view. Method createModalView
// should be implemented on the view class that uses the mixin.
Vilio.ViewWithModalMixin = Ember.Mixin.create({
	modalView: null,

	close: function() {
		this.closeModalView();
	},

	closeModalView: function() {
		if (this.modalView)
			this.modalView.close();
	},

	// open modal view of relationship to show all
	// details
	showModalView: function() {
		this.closeModalView();
		this.modalView = this.createModalView();
		this.modalView.append();		
	}
});

Vilio.DragNDrop = Ember.Namespace.create();

// adapted from http://stackoverflow.com/questions/10762484/ember-js-html5-drag-and-drop-shopping-cart-demo
Vilio.DragNDrop.cancel = function(event) {
    event.preventDefault();
    return false;
};

Vilio.DragNDrop.Draggable = Ember.Mixin.create({
    attributeBindings: 'draggable',
    draggable: 'true',
    dragStart: function(event) {
        var dataTransfer = event.originalEvent.dataTransfer;
        dataTransfer.setData('Text', this.get('elementId'));
    }
});

Vilio.DragNDrop.Droppable = Ember.Mixin.create({
    dragEnter: Vilio.DragNDrop.cancel,
    dragOver: Vilio.DragNDrop.cancel,
    drop: function(event) {
        event.preventDefault();
        return false;
    }
});
