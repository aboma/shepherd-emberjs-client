Luxin.RelationshipsIndexController = Ember.ArrayController.extend({});

Luxin.RelationshipsController = Ember.ObjectController.extend({});

Luxin.RelationshipsNewController = Ember.ObjectController.extend({
	needs: ['portfolio'],
	
	portfolio: function() {
		var cont = this.get('controllers.portfolio');
		var content = this.get('controllers.portfolio.content');
		return this.get('controllers.portfolio.content.id');
	}.property('controllers.portfolio.content.id'),
	
	upload : function(form_data, success_callback, error_callback) {
		//var assets_url = Luxin.store.adapter.url + '/assets'
		var url = Luxin.CONFIG.url + '/' + Luxin.Asset.collectionUrl;
		$.ajax({
			url : url, 
			type : 'POST', /*
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
			success : success_callback,
			error : error_callback,
			// Form data
			data : form_data,
			// Options to tell JQuery not to process data or worry about
			// content-type
			cache : false,
			contentType : false,
			processData : false
		});
	}
});