Shepherd.TopNavView = Ember.View.extend({
	templateName: "menus/topnav",
    selectedBinding: Ember.Binding.oneWay('controller.selected'),
    navItemView: Ember.View.extend({
      tagName: 'li',
      classNameBindings: 'isActive:active'.w(),
      isActive: function() {
        return this.get('item') === this.get('parentView.selected');
      }.property('item', 'parentView.selected')
    })
});
