Shepherd.ApplicationAdapter = DS.ActiveModelAdapter.extend({ 
    host: shepherd_rest_url
});

Shepherd.MetadatumValuesListSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        metadatumListValues: {embedded: 'always'}
    }
});

Shepherd.MetadataTemplateSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        metadataTemplateFieldSettings: {embedded: 'always'}
    }
});

Shepherd.RelationshipSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        asset: {embedded: 'always'}
    }
});

// use customized Embedded Records mixin to handle case where you want to 
// embed records only on submit
Shepherd.AssetSerializer = DS.ActiveModelSerializer.extend(DS.ExtendedEmbeddedRecordsMixin, {
    attrs: {
        metadata: {embedded: 'submit'}
    }
});

Shepherd.ArrayTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    console.log('deserializing array');
    return serialized.split(',');
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

Shepherd.FileTransform = DS.Transform.extend({
  serialize: function(value) {
    return value;
  },
  deserialize: function(value) {
    return value;
  }
});

// adapter to handle file uploads when creating new relationship with asset
// embedded, using FormData object to post form with file
Shepherd.RelationshipAdapter = DS.ActiveModelAdapter.extend({
  host: shepherd_rest_url,
  createRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);
    var formData = record.get('formData');

    console.log('custom relationship adapter');
    if (formData) {
      // submit formData instead of json hash
      console.log('submitting formData for relationship');
      return this.ajax(this.buildURL(type.typeKey), "POST", { 
        data: formData,
		// Options to tell JQuery not to process data or worry about
		// content-type
		cache : false,
		contentType : false,
		processData : false
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
      });
    } else {
      // standard functionality
      serializer.serializeIntoHash(data, type, record, { includeId: true });

      return this.ajax(this.buildURL(type.typeKey), "POST", { data: data });
    }
  },

  // override ajaxOptions to allow setting of content type
  ajaxOptions: function(url, type, hash) {
    hash = hash || {};
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    hash.context = this;

    if (hash.data && type !== 'GET') {
      if (hash.contentType === undefined) {
        hash.contentType = 'application/json; charset=utf-8';
        hash.data = JSON.stringify(hash.data);
      }
    }

    if (this.headers !== undefined) {
      var headers = this.headers;
      hash.beforeSend = function (xhr) {
        forEach.call(Ember.keys(headers), function(key) {
          xhr.setRequestHeader(key, headers[key]);
        });
      };
    }


    return hash;
  }
});
