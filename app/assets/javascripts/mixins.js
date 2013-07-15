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
// for use in controllers
Vilio.EditModelControllerMixin = Ember.Mixin.create({
    needs:['message'],
	transaction: null,

    changesExist: function() {
       return true;   //TODO fix
    },

	startEditing: function(transaction) {
		if (!transaction) {
			transaction = this.store.transaction();
			// transaction.add(this.get('content'));
		}
		this.transaction = transaction;			
	},
	// works for both save and edit by inspecting record states
	// commit record if it has changed; returns promise of 
    // record create or update
	saveEdits: function() {
        var controller = this,
            msgController = this.get('controllers.message'),
		    record = this.get('content');
        return new Em.RSVP.Promise(function(resolve, reject) {
            // reset transaction if user wants to resubmit record
            // that is invalid or in error state
            if (!record.get('isValid') || record.get('isError')) {
                this.resetTransaction();
            }
            if (controller.changesExist()) {
                msgController.set('message', 'saving record');
			    var method = record.get('isNew') === true ? 'didCreate' : 'didUpdate';
    			// callback will show record once the id is available
	    		record.one(method, controller, function() {
                    msgController.set('message', 'record saved');
                    if (method === 'didUpdate') {
                        // resolve promise
                        resolve();
                    } else {
                        // observe for when id is created since we may need this
                        // for transition
		    	        record.addObserver('id', this, resolve);
                    }
		    	});
                var errorHandler = function() {
                    // reject promise
                    reject();
                    var type = this.get('content.isError') ? 'error' : 'problem';
                    msgController.set('message', type + ' saving record');
                    this.get('content.transaction').rollback();
                }
                // callback for invalid or conflict response from server
                record.one('becameInvalid', controller, errorHandler);
                record.one('becameError', controller, errorHandler);
		    	// trigger save
			    record.get('transaction').commit();
    		} else {
                msgController.set('message', 'no changes to save in model');
                resolve();
    		}
        });
	},
	// returns promise to delete resource
	deleteRecord: function() {
    	var controller = this,
            record = this.get('content');
        return new Em.RSVP.Promise(function(resolve, reject) {
	    	record.one('didDelete', controller, function() {
		    	console.log('record deleted');
                resolve();
	    	});
            record.one('didError', controller, function() {
                console.log('error deleting record');
                reject();
            });
		    record.deleteRecord();
    		controller.transaction.commit();
        });
	},
	stopEditing: function(callback) {
        var controller = this;
        return new Em.RSVP.Promise(function(resolve, reject) {
          controller.get('content.transaction').rollback();
          resolve();
        });
	},
    // enable transaction to be submitted again
    resetTransaction: function() {
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

	click: function() {
		this.showModalView();
	},

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
