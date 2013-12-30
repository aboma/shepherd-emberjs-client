Shepherd.ModelAuditFieldsMixin = Ember.Mixin.create({
    createdAt : DS.attr('date'),
    createdBy : DS.belongsTo('User'),
    updatedAt : DS.attr('date'),
    updatedBy : DS.belongsTo('User'),

    updatedAtBy: function() {
        var user = this.get('updatedBy');
        return user.get('firstName') + ' ' + user.get('lastName');
    }
});

Shepherd.ResourceControllerMixin = Ember.Mixin.create({
    uri: function() {
        return this.get('content.data.links.self');
    }.property('content')
});

// Mixin to generalize model create/edit functionality
// for use in controllers. Typical use in route:
Shepherd.EditModelControllerMixin = Ember.Mixin.create({
    needs:['message'],

    // save edits and show success or error message to user;
    // return RSVP promise to enable promise chaining
	saveEdits: function(record) {
        var controller = this,
            msgController = this.get('controllers.message');
		if (!record) { record = this.get('content'); }
        msgController.set('message', 'saving record');
        return record.save().then(function(savedRecord){
            msgController.set('message', 'record saved');
            return savedRecord;
        });
	},
	// returns RSVP promise to delete resource
	deleteRecord: function(record) {
        var controller = this,
            msgController = this.get('controllers.message');
        if (!record) { record = this.get('content'); }
        msgController.set('message', 'deleting record');
        return record.deleteRecord().then(function(){
            msgController.set('message', 'record deleted');
        }, function() {
            msgController.set('message', 'error deleting record');
        });
	},
    // rollback changes to model when editing has stopped
	stopEditing: function() {
        this.get('model').rollback();
	},
    // enable transaction to be submitted again
    resetRecordState: function() {
        var record = this.get('content');
        var state = record.get('id') ? 'loaded.updated.uncommitted' : 'loaded.created.uncommited';
        record.get('stateManager').transitionTo(state);
    }
});

// View mixin to create and control modal view that will
// be opened when user clicks on view. Method createModalView
// should be implemented on the view class that uses the mixin.
Shepherd.ViewWithModalMixin = Ember.Mixin.create({
	modalView: null,

	close: function() {
		this.closeModalView();
	},

	closeModalView: function() {
		if (this.modalView) {
			this.modalView.close();
        }
	},

	// open modal view of relationship to show all
	// details
	showModalView: function() {
		this.closeModalView();
		this.modalView = this.createModalView();
		this.modalView.append();		
	}
});

Shepherd.DragNDrop = Ember.Namespace.create();

// adapted from http://stackoverflow.com/questions/10762484/ember-js-html5-drag-and-drop-shopping-cart-demo
Shepherd.DragNDrop.cancel = function(event) {
    event.preventDefault();
    return false;
};

Shepherd.DragNDrop.Draggable = Ember.Mixin.create({
    attributeBindings: 'draggable',
    draggable: 'true',
    dragStart: function(event) {
        var dataTransfer = event.originalEvent.dataTransfer;
        dataTransfer.setData('Text', this.get('elementId'));
    }
});

Shepherd.DragNDrop.Droppable = Ember.Mixin.create({
    dragEnter: Shepherd.DragNDrop.cancel,
    dragOver: Shepherd.DragNDrop.cancel,
    drop: function(event) {
        event.preventDefault();
        return false;
    }
});


(function() {
var get = Ember.get;
var forEach = Ember.EnumerableUtils.forEach;

/**
  The EmbeddedRecordsMixin allows you to add embedded record support to your
  serializers.
  To set up embedded records, you include the mixin into the serializer and then
  define your embedded relations.

  ```js
  App.PostSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
      comments: {embedded: 'always'}
    }
  })
  ```

  Currently only `{embedded: 'always'}` records are supported.

  @class EmbeddedRecordsMixin
  @namespace DS
*/
DS.ExtendedEmbeddedRecordsMixin = Ember.Mixin.create({

  /**
    Serialize has-may relationship when it is configured as embedded objects.

    @method serializeHasMany
  */
  serializeHasMany: function(record, json, relationship) {
    var key   = relationship.key,
        attrs = get(this, 'attrs'),
        embed = attrs && attrs[key] && 
              ((attrs[key].embedded === 'always') || (attrs[key].embedded === 'submit'));

    if (embed) {
      json[this.keyForAttribute(key)] = get(record, key).map(function(relation) {
        var data = relation.serialize(),
            primaryKey = get(this, 'primaryKey');

        data[primaryKey] = get(relation, primaryKey);

        return data;
      }, this);
    }
  },

  /**
    Extract embedded objects out of the payload for a single object
    and add them as sideloaded objects instead.

    @method extractSingle
  */
  extractSingle: function(store, primaryType, payload, recordId, requestType) {
    var root = this.keyForAttribute(primaryType.typeKey),
        partial = payload[root];

    updatePayloadWithEmbedded(store, this, primaryType, partial, payload);

    return this._super(store, primaryType, payload, recordId, requestType);
  },

  /**
    Extract embedded objects out of a standard payload
    and add them as sideloaded objects instead.

    @method extractArray
  */
  extractArray: function(store, type, payload) {
    var root = this.keyForAttribute(type.typeKey),
        partials = payload[Ember.String.pluralize(root)];

    forEach(partials, function(partial) {
      updatePayloadWithEmbedded(store, this, type, partial, payload);
    }, this);

    return this._super(store, type, payload);
  }
});

function updatePayloadWithEmbedded(store, serializer, type, partial, payload) {
  var attrs = get(serializer, 'attrs');

  if (!attrs) {
    return;
  }

  type.eachRelationship(function(key, relationship) {
    var expandedKey, embeddedTypeKey, attribute, ids,
        config = attrs[key],
        serializer = store.serializerFor(relationship.type.typeKey),
        primaryKey = get(serializer, "primaryKey");

    if (relationship.kind !== "hasMany") {
      return;
    }

    if (config && (config.embedded === 'always' || config.embedded === 'load')) {
      // underscore forces the embedded records to be side loaded.
      // it is needed when main type === relationship.type
      embeddedTypeKey = '_' + Ember.String.pluralize(relationship.type.typeKey);
      expandedKey = this.keyForRelationship(key, relationship.kind);
      attribute  = this.keyForAttribute(key);
      ids = [];

      if (!partial[attribute]) {
        return;
      }

      payload[embeddedTypeKey] = payload[embeddedTypeKey] || [];

      forEach(partial[attribute], function(data) {
        var embeddedType = store.modelFor(relationship.type.typeKey);
        updatePayloadWithEmbedded(store, serializer, embeddedType, data, payload);
        ids.push(data[primaryKey]);
        payload[embeddedTypeKey].push(data);
      });

      partial[expandedKey] = ids;
      delete partial[attribute];
    }
  }, serializer);
}
})();


