Luxin.RelationshipsIndexController = Ember.ArrayController.extend({});

Luxin.RelationshipsController = Ember.ObjectController.extend({});

Luxin.RelationshipsNewController = Ember.ObjectController.extend(Luxin.EditModelMixin, {
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
        var url = Luxin.CONFIG.url + '/' + Luxin.Asset.collectionUrl;
        
		$.ajax({
			url : url, 
			type : 'POST', 
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
            success: function(json) {

            },
            error: function(xhr) {

            },
			// Form data
			data : formData,
			// Options to tell JQuery not to process data or worry about
			// content-type
			cache : false,
			contentType : false,
			processData : false
		});
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