Vilio.RESTAdapter = DS.RESTAdapter.extend({ 
  bulkCommit: false,
  url: "http://localhost:4444" ,
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
});

Vilio.RESTAdapter.map('Vilio.Asset', {
  links: { embedded: 'load' },
  metadata: { embedded: 'always' }
});
Vilio.RESTAdapter.map('Vilio.Relationship', {
  asset: { embedded: 'load' },
  links : { embedded: 'load' }
});
Vilio.RESTAdapter.map('Vilio.MetadatumValuesList', {
  metadatumListValues: { embedded: 'always' },
  links : { embedded: 'load' }
});
Vilio.RESTAdapter.map('Vilio.MetadatumField', {
  links : { embedded: 'load' }

});
Vilio.RESTAdapter.map('Vilio.MetadataTemplate', {
  metadataTemplateFieldSettings: { embedded: 'always' }, 
  links : { embedded: 'load' }
});
Vilio.RESTAdapter.map('Vilio.Portfolio', {
  links : { embedded: 'load' }
});

Vilio.RESTAdapter.configure('Vilio.MetadatumValue', {
    sideloadAs: 'metadata'
});

Vilio.RESTAdapter.map('Vilio.User', {
  links : { embedded: 'load' }
});

Vilio.RESTAdapter.configure('plurals', { settings: 'settings' });
Vilio.RESTAdapter.configure('plurals', { metadata: 'metadata' });

Vilio.RESTAdapter.registerTransform('array', {
  deserialize: function(serialized) {
    return serialized.split(',');
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

Vilio.Store = DS.Store.extend({
  adapter: Vilio.RESTAdapter 
});

// adapter to handle file uploads
Vilio.FileUploadRESTAdapter = Vilio.RESTAdapter.extend({
    bulkCommit: false,

    createRecord: function(store, type, record) {
        var adapter = this;
        var root = this.rootForType(type), json = {};
        var formData = record.get('formData');
    	console.log('FileUploadRestAdapter saving record with file');

        return $.ajax({
			url : this.buildURL(root), 
			type : 'POST', 
			context : this,  
			// Form data
			data : formData,
			// Options to tell JQuery not to process data or worry about
			// content-type
			cache : false,
			contentType : false,
			processData : false
		}).then(function(json){
            adapter.didCreateRecord(store, type, record, json);
        }, function(xhr) {
            adapter.didError(store, type, record, xhr);
            throw xhr;
        }).then(null, DS.rejectionHandler);
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
Vilio.Store.registerAdapter('Vilio.Relationship', Vilio.FileUploadRESTAdapter.create());
