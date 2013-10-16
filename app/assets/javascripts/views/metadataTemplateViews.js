Shepherd.TemplatesView = Ember.View.extend({
    templateName: 'metadata/metadataTemplates'
});

Shepherd.TemplatesIndexView = Ember.View.extend({
    templateName: 'metadata/metadataTemplatesIndex' 
});

Shepherd.TemplatesNewView = Ember.View.extend({
    templateName: 'metadata/metadataTemplateEdit'
});

Shepherd.TemplateShowView = Ember.View.extend({
    templateName: 'metadata/metadataTemplateShow'
});

Shepherd.TemplateEditView = Ember.View.extend({
    templateName: 'metadata/metadataTemplateEdit'
});

Shepherd.FieldDraggableView = Ember.View.extend(Shepherd.DragNDrop.Draggable, {
    // .setDragImage (in #dragStart) requires an HTML element as the first argument
    // so you must tell Ember to create the view and it's element and then get the 
    // HTML representation of that element.
    dragElement: Ember.View.create({
        tagName: 'div',
        classNames: ['field'],
        template: Ember.Handlebars.compile("{{name}}")
    }).createElement().get('element'),

    dragStart: function(event) {
        this._super(event);
        // Let the controller know this view is dragging
        this.set('content.isDragging', true);

        // Set the drag image and location relative to the mouse/touch event
        var dataTransfer = event.originalEvent.dataTransfer;
        dataTransfer.setDragImage(this.get('dragElement'), 24, 24);
    },

    dragEnd: function(event) {
        // Let the controller know this view is done dragging
        this.set('content.isDragging', false);
    }
});

Shepherd.FieldSelectionView = Ember.View.extend(Shepherd.DragNDrop.Droppable, {
  classNames: ['drop-target'],
  drop: function(event) {
    console.log('dropping field');
    event.preventDefault();
    var viewId = event.originalEvent.dataTransfer.getData('Text'),
        view = Ember.View.views[viewId],
        fieldSetting = view.get('content');
    this.get('controller').removeFieldSetting(fieldSetting);
    return false;
  }
});

Shepherd.FieldsListView = Ember.View.extend(Shepherd.DragNDrop.Droppable, {
  classNames: ['drop-target'],
  drop: function(event) {
    console.log('dropping field');
    event.preventDefault();
    var viewId = event.originalEvent.dataTransfer.getData('Text'),
        view = Ember.View.views[viewId],
        field = view.get('content');
    this.get('controller').addFieldSetting(field);
    return false;
  }
});

Shepherd.MetadataTemplateFieldSettingView = Shepherd.FieldDraggableView.extend({
});
