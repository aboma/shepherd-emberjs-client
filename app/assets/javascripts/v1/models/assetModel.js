Luxin.Asset = DS.Model.extend({
	name : DS.attr('string'),
	url : DS.attr('string'),
	thumbnail_path : DS.attr('string'),
	links : DS.attr('links'),
	portfolios : DS.hasMany('Luxin.Portfolio'),

	upload : function(form_data, success_callback, error_callback) {
		var assets_url = Luxin.store.adapter.url + '/assets'
		$.ajax({
			url : assets_url, 
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

Luxin.Asset.reopenClass({
	collectionUrl : 'assets',
	resourceUrl : 'assets',
	url : 'asset',
	resourceName : 'asset'
});