DS.RESTAdapter.map('Vilio.Asset', {
  links: { embedded: 'load' },
});
DS.RESTAdapter.map('Vilio.Relationship', {
  asset: { embedded: 'load' }
});
DS.RESTAdapter.map('Vilio.MetadataValuesList', {
  metadataFields: { embedded: 'always' }
});
DS.RESTAdapter.map('Vilio.MetadataField', {
  links : { embedded: 'load' }
});


DS.RESTAdapter.configure('plurals', { settings: 'settings' });

DS.RESTAdapter.registerTransform('array', {
  deserialize: function(serialized) {
    return serialized.split(',');
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

Vilio.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({ 
	  bulkCommit: false,
	  url: "http://localhost:4444" ,
      // extend adapter to support foreign keys in belongsTo relationship
	  serializer: DS.RESTSerializer.extend({
        addHasMany: function(hash, record, key, relationship) {
          var type = record.constructor,
              name = relationship.key,
              serializedHasMany = [],
              manyArray, embeddedType;

          embeddedType = this.embeddedType(type, name);
          if (embeddedType !== 'always') { return; }

          manyArray = record.get(name);

          manyArray.forEach(function(record) {
            serializedHasMany.push(record.get('id'));
          }, this);

          hash[this.singularize(key) + '_ids'] = serializedHasMany;
        }
      }),
      // override didError to handle 409 conflict status properly
	  didError: function(store, type, record, xhr) {
    	if (xhr.status === 422 || xhr.status === 409) {
      		var json = JSON.parse(xhr.responseText),
          	serializer = this.get('serializer'),
          	errors = serializer.extractValidationErrors(type, json);

      		store.recordWasInvalid(record, errors);
    	} else {
      		this._super.apply(this, arguments);
    	}
  	  }
  })
});

// adapter to handle file uploads
// this does not work due to this bug: https://github.com/emberjs/data/issues/616
Vilio.FileUploadRESTAdapter = DS.RESTAdapter.extend({
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

Vilio.FileUploadRESTAdapter.registerTransform('file', {
	  serialize: function(value) {
	    return value;
	  },
	  deserialize: function(value) {
	    return value;
	  }
});

//use overridden adapter to handle file uploads
Vilio.Store.registerAdapter(Vilio.Asset, Vilio.FileUploadRESTAdapter.create());
