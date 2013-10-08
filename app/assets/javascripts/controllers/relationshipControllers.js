Vilio.RelationshipsIndexController = Ember.ArrayController.extend({	
    // relationship selected from the list
    selectedRelationship: null,

	// broken per https://github.com/emberjs/data/issues/587
	empty: function() {
		var numOfAssets = this.get('content.length');
		return numOfAssets === 0;
	}.property('content.length'),

    clearSelected: function() {
        this.set('selectedRelationship', null);
    },
    setSelected: function(relationship) {
        this.set('selectedRelationship', relationship);
    }
});

Vilio.RelationshipsController = Ember.ObjectController.extend({});

Vilio.RelationshipController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
    needs: ['relationshipsIndex'],

    // determine if this is the relationship selected from the list; 
    // allows for setting the selected relationship programmatically 
    // and then having the appropriate individual view respond
    isSelected: function() {
        return (this.get('content') === this.get('controllers.relationshipsIndex.selectedRelationship'));
    }.property('controllers.relationshipsIndex.selectedRelationship'),

    deselect: function() {
        this.get('controllers.relationshipsIndex').clearSelected();
    },
    destroyRelationship: function(relationship) {
        var controller = this;
        this.deleteRecord().then(function() {
            controller.deselect();
        }, function() {
            //TODO handle error
        });
    },
    removeFromPortfolio: function(relationship) {
        this.destroyRelationship(relationship);
    }
});

Vilio.RelationshipsNewController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
	needs: ['portfolio'],

	portfolio: function() {
		return this.get('controllers.portfolio.content.id');
	}.property('controllers.portfolio.content'),

    create: function(asset, portfolio) {
		var relationship = this.store.transaction().createRecord(Vilio.Relationship);
        relationship.set('asset', asset);
        relationship.set('portfolio', portfolio);
        portfolio.get('relationships').pushObject(relationship);
        this.set('content', relationship);
        this.saveEdits().then(function() {
            console.log('relationship created');
        });
    }
});
