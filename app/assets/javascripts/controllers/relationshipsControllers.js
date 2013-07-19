Vilio.RelationshipsIndexController = Ember.ArrayController.extend({	
	// broken per https://github.com/emberjs/data/issues/587
	empty: function() {
		var numOfAssets = this.get('content.length');
		return numOfAssets === 0;
	}.property('content.length')
});

Vilio.RelationshipsController = Ember.ObjectController.extend({
    added: function() {
        var length = this.get('content.length');
        console.log('content changed; length is ' + length);
    }.property('content.@each')
});

Vilio.RelationshipController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
	// event to remove/delete relationship
	removeRelationship: function(callback) {
		console.log('remove relationship triggered');
		this.deleteRecord(callback);
	}
});

Vilio.RelationshipsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
	needs: ['portfolio'],

	portfolio: function() {
		var cont = this.get('controllers.portfolio');
		var content = this.get('controllers.portfolio.content');
		return this.get('controllers.portfolio.content.id');
	}.property('controllers.portfolio.content.id'),

	addFile: function(rawfile) {
		var content = this.get('content');
		content.set('file', rawfile);
		console.log('added content to file');
	},

    upload: function(formData) {
        var record = this.get('store').transaction().createRecord(Vilio.Relationship, {});
        record.set('formData', formData);
        record.get('transaction').commit();
    },
	upload_archive: function(formData, success_callback, error_callback) {
        var controller = this;
        var type = Vilio.Relationship;
        var store = controller.get('store');
        var adapter = store.adapterForType(type);
        var root = adapter.get('serializer').rootForType(type), json = {};
        var url = adapter.buildURL(root);
        var success = function(json) {
        	// load new relationship
            var result = adapter.load(store, Vilio.Relationship, json);
            var newRecord = store.transaction().createRecord(Vilio.Relationship, {});
            adapter.didCreateRecord(store, type, newRecord, json);
            //var rel = this.get('controllers.relationships.content');
         	if (success_callback && typeof success_callback === 'function')
        		success_callback();
        };
        error_callback || ( error_callback = function(xhr) {
        	console.log('ajax error: ' + xhr);
        });

		$.ajax({
			url : url, 
			type : 'POST', 
			dataType : 'json',
		    accepts: {
		        text: "application/json"
		    },
			context : this,  /*
			xhr : function() { // custom xhr
				myXhr = $.ajaxSettings.xhr();
				if (myXhr.upload) { // check if upload property exists
					myXhr.upload.addEventListener('progress',
							progressHandlingFunction, false); // for handling
																// the progress
																// of the upload
				}
				return myXhr;
			}, */
			// Form data
			data : formData,
			// Options to tell JQuery not to process data or worry about
			// content-type
			cache : false,
			contentType : false,
			processData : false
		}).then(success, error_callback);

        /*
        var fileinput = $(event.target).find('input[type="file"]:first');
        if (fileinput.length > 0 && fileinput[0].files && fileinput[0].files[0]) {
	        var reader = new FileReader();
	        var that = this;
	        reader.onload = function(e) {
	            var fileToUpload = e.target.result;
	            console.log('>>>>>>> file ready for upload');
	            if (self.controller.addFile) {
	            	self.controller.addFile(fileToUpload);
	            	self.controller.upload();
	            } else {
	            	console.log('controller does not handle file uploads');
	            }
	            //var person = PersonApp.Person.createRecord({ username: 'heyo', attachment: fileToUpload });
	            //self.get('controller.target').get('store').commit();
	        }
	        reader.readAsDataURL(fileinput[0].files[0]);
        }
        */
	}

});
