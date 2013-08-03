Vilio.RelationshipsIndexController = Ember.ArrayController.extend({	
    // relationship selected from the list
    selectedRelationship: null,

	// broken per https://github.com/emberjs/data/issues/587
	empty: function() {
		var numOfAssets = this.get('content.length');
		return numOfAssets === 0;
	}.property('content.length')
});

Vilio.RelationshipsController = Ember.ObjectController.extend({});

Vilio.RelationshipController = Ember.ObjectController.extend(Vilio.EditModelControllerMixin, {
    needs: ['relationshipsIndex'],

    // determine if this is the relationship selected from the list; 
    // allows for setting the selected relationship programmatically 
    // and then having the appropriate individual view respond
    selected: function() {
        return (this.get('content') === this.get('controllers.relationshipsIndex.selectedRelationship'));
    }.property('controllers.relationshipsIndex.selectedRelationship'),

	// event to remove/delete relationship
	removeRelationship: function(callback) {
		console.log('remove relationship triggered');
        this.deselect();
		this.deleteRecord();
	},
    // mark this relationship as the one selected from the list
    select: function() {
        this.set('controllers.relationshipsIndex.selectedRelationship', this.get('content'));
    },
    deselect: function() {
        this.set('controllers.relationshipsIndex.selectedRelationship', null);
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
		var cont = this.get('controllers.portfolio');
		var content = this.get('controllers.portfolio.content');
		return this.get('controllers.portfolio.content.id');
	}.property('controllers.portfolio.content.id')
});
