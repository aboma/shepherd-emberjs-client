// Mixin to generalize model create/edit functionality
// for use in controllers
Vilio.EditModelControllerMixin = Ember.Mixin.create({
	transaction: null,
	
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
		var record = this.get('content');
		if (record.get('isDirty')) {
			var method = record.get('isNew') === true ? 'didCreate' : 'didUpdate';
			// callback will show record once the id is available
			record.one(method, function() {
				if (callback && typeof callback === 'function'){
					record.addObserver('id', this, callback);
				}
			});
			// trigger save
			this.transaction.commit();
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