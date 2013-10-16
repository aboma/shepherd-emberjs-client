Shepherd.RESTAdapter = DS.RESTAdapter.extend({ 
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

Shepherd.RESTAdapter.map('Shepherd.Asset', {
  links: { embedded: 'load' },
  metadata: { embedded: 'always' }
});
Shepherd.RESTAdapter.map('Shepherd.Relationship', {
  asset: { embedded: 'load' },
  links : { embedded: 'load' }
});
Shepherd.RESTAdapter.map('Shepherd.MetadatumValuesList', {
  metadatumListValues: { embedded: 'always' },
  links : { embedded: 'load' }
});
Shepherd.RESTAdapter.map('Shepherd.MetadatumField', {
  links : { embedded: 'load' }

});
Shepherd.RESTAdapter.map('Shepherd.MetadataTemplate', {
  metadataTemplateFieldSettings: { embedded: 'always' }, 
  links : { embedded: 'load' }
});
Shepherd.RESTAdapter.map('Shepherd.Portfolio', {
  links : { embedded: 'load' }
});

Shepherd.RESTAdapter.configure('Shepherd.MetadatumValue', {
    sideloadAs: 'metadata'
});

Shepherd.RESTAdapter.map('Shepherd.User', {
  links : { embedded: 'load' }
});

Shepherd.RESTAdapter.configure('plurals', { settings: 'settings' });
Shepherd.RESTAdapter.configure('plurals', { metadata: 'metadata' });

Shepherd.RESTAdapter.registerTransform('array', {
  deserialize: function(serialized) {
    return serialized.split(',');
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

Shepherd.Store = DS.Store.extend({
  adapter: Shepherd.RESTAdapter 
});

// adapter to handle file uploads
Shepherd.FileUploadRESTAdapter = Shepherd.RESTAdapter.extend({
    bulkCommit: false,

    createRecord: function(store, type, record) {
        var adapter = this;
        var root = this.rootForType(type), json = {};
        var formData = record.get('formData');
        // if not formData on this record, use default adapter instead
        // since there is noting to post
        if (!formData) {
            store.get('_adapter').createRecord(store, type, record);
            return;
        }

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

Shepherd.FileUploadRESTAdapter.registerTransform('file', {
	  serialize: function(value) {
	    return value;
	  },
	  deserialize: function(value) {
	    return value;
	  }
});

//use overridden adapter to handle file uploads
Shepherd.Store.registerAdapter('Shepherd.Relationship', Shepherd.FileUploadRESTAdapter.create());
