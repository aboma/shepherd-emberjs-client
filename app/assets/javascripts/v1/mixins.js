Luxin.CustomActionAttacher = Ember.Mixin.create({
	init : function() {
		var actionName = this.get('action');
		target = this.get('target'), targetObj = Ember.get(target);

		if (actionName && targetObj) {
			view = this;
			
			var eventHandler = function(event) {

				// Check for StateManager (or compatible object)
				if (targetObj.isState && typeof targetObj.send === 'function') {
					return targetObj.send(actionName, event);
				} else {
					Ember.assert(Ember.String.fmt(
							'Target %@ does not have action %@', [ target,
									actionName ]), target[actionName]);
					return targetObj[actionName].call(targetObj, event);
				}
			}

			this.set(actionName, eventHandler);

		}
		this._super();

	}
});