Vilio.EditModelMixin = Ember.Mixin.create({
	startEditing: function(transaction) {
		this.transaction = transaction;			
	},
	//TODO make this work for both save and edit
	saveEdits: function(callback) {
		// commit record if it has changed; exit function will
		// clean up unused transaction
		var record = this.get('content');
		if (record.get('isDirty')) {
			// callback will show record once the id is available
			record.one('didUpdate', function() {
				if (callback && typeof callback === 'function'){
					callback.call(this);
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
	remove: function(callback) {
		// delete record and return to records list
		var record = this.get('content');
		record.one('didDelete', function() {
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