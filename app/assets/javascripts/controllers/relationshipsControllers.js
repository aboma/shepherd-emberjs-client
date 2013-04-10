Vilio.RelationshipsIndexController = Ember.ArrayController.extend({	
	// broken per http://stackoverflow.com/questions/11267100/is-it-possible-to-use-function-in-handlebars-if
	empty: function() {
		var numOfAssets = this.get('content.length');
		return numOfAssets === 0;
	}.observes('content.length')
});

Vilio.RelationshipsController = Ember.ObjectController.extend({});

Vilio.RelationshipController = Ember.ObjectController.extend(Vilio.EditModelMixin, {
	// event to remove/delete relationship
	removeRelationship: function(callback) {
		console.log('remove relationship triggered');
		this.startEditing();
		this.deleteRecord(callback);
	}
});

Vilio.RelationshipsNewController = Ember.ObjectController.extend(Vilio.EditModelMixin, {
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
	
	upload: function(formData, success_callback, error_callback) {
        var controller = this;
        var url = 'http://' + Vilio.CONFIG.url + '/' + Vilio.Relationship.collectionUrl;
        var success = function(json) {
        	// load new relationship
        	var store = controller.get('store');
        	store.adapterForType(Luxin.Relationship).load(store, Luxin.Relationship, json);
        	if (success_callback && typeof success_callback === 'function')
        		success_callback();
        };
        
		var request = $.ajax({
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
			// Ajax events
            success: success_callback,
			// Form data
			data : formData,
			// Options to tell JQuery not to process data or worry about
			// content-type
			cache : false,
			contentType : false,
			processData : false
		});
		
		error_callback || ( error_callback = function(xhr) {
        	console.log('ajax error: ' + xhr);
        });
		
		request.then(success_callback, error_callback);
		
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