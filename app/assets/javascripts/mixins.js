// Mixin to generalize model create/edit functionality
// for use in controllers
Vilio.EditModelControllerMixin = Ember.Mixin.create({
    needs:['message'],
	transaction: null,

	// Set associations to be associations of the content. These will then be checked for validity on save
	// and all of the flags, such as isDirty and isLoaded, will take these associations into consideration.
	associations: [],

  	models: (function() {
    	var controller = this;
    	return $.map($.merge(['content'], this.get('associations')), function(value, i) {
      		return controller.get(value);
    	});
	}).property('content', 'associations'),

	startEditing: function(transaction) {
		if (!transaction) {
			transaction = this.store.transaction();
			transaction.add(this.get('content'));
		}
		this.transaction = transaction;			
	},
	// works for both save and edit by inspecting record states
	saveEdits: function(callback) {
		// commit record if it has changed; exit function will
		// clean up unused transaction
        var controller = this;
        var msgController = this.get('controllers.message');
        msgController.set('message', 'saving record');
		var record = this.get('content');
		if (record.get('isDirty')) {
			var method = record.get('isNew') === true ? 'didCreate' : 'didUpdate';
			// callback will show record once the id is available
			record.one(method, function() {
                msgController.set('message', 'record saved');
				if (callback && typeof callback === 'function'){
                  if (method === 'didUpdate') {
                    callback.call();
                  } else {
                    // observe for when id is created since we may need this
                    // for transition
					record.addObserver('id', this, callback);
                  }
				}
			});
            // callback for invalid or conflict response from server
            record.one('becameInvalid', function() {
                msgController.set('message', 'error saving record');
                controller.resetTransaction();
            });
			// trigger save
			record.get('transaction').commit();
		} else {
			this.stopEditing();
			if (callback && typeof callback === 'function'){
				callback.call(this);
			}
		}
	},
	// delete record and return to records list
	deleteRecord: function(callback) {
		var record = this.get('content');
		record.one('didDelete', this, function() {
			console.log('record deleted');
			if (callback && typeof callback === 'function'){
				callback.call(this);
			}
		});
		record.deleteRecord();
		this.transaction.commit();
	},
	stopEditing: function(callback) {
		// clean up unused transaction
		if (this.transaction) {
			this.transaction.rollback();
			this.transaction.destroy();
		}
		if (callback && typeof callback === 'function'){
			callback.call(this);
		}
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
