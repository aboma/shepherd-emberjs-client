Luxin.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({ 
	  bulkCommit: false,
	  url: "http://localhost:4444",
	  serializer: DS.RESTSerializer.extend({
	      init: function() {
	        this._super();
	        this.map("Luxin.Asset", {
	          links: { embedded: "load" }
	        });
	      }
	  })
  })
});

// adapter to handle file uploads
// this does not work due to this bug: https://github.com/emberjs/data/issues/616
Luxin.FileUploadRESTAdapter = DS.RESTAdapter.extend({
    bulkCommit: false,

    createRecord: function(store, type, record) {
    	console.log('FileUploadRestAdapter saving record with file');
        var root = this.rootForType(type), json = {};

        var form_data = new FormData();
        for(var prop in record) {
        	form_data.append(record.key, record.value);
        }
        //data.append('username', record.get('username'));
        //data.append('attachment', record.get('attachment'));

		$.ajax({
			url : this.buildURL(root), 
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
                Ember.run(this, function(){
                  this.didCreateRecord(store, type, record, json);
                });
            },
            error: function(xhr) {
                this.didError(store, type, record, xhr);
            },
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

Luxin.FileUploadRESTAdapter.registerTransform('file', {
	  serialize: function(value) {
	    return value;
	  },
	  deserialize: function(value) {
	    return value;
	  }
});

//use overridden adapter to handle file uploads
Luxin.Store.registerAdapter(Luxin.Asset, Luxin.FileUploadRESTAdapter.create());