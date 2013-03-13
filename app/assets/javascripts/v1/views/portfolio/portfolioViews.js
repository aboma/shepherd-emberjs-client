Vilio.PortfolioSelect2 = Vilio.Select2.extend({
	
	// bind change in selected portfolio to trigger routing 
	// to show portfolio or portfolio list if null
    valueDidChange: Ember.observer(function() {
        this._super();
        var selection = this.get('selection');
        if (selection) {
            console.log('select2 value changed to ' + selection.get('name'));
        	this.get('controller').transitionToRoute('portfolio.show', selection);
        } else {
        	this.get('controller').transitionToRoute('portfolios.index');
        }
    }, 'value')
});

Vilio.PortfoliosIndexView = Ember.View.extend({
  	templateName: 'v1/templates/portfolio/list'
});

Vilio.PortfoliosNewView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/edit'
});

Vilio.PortfoliosView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/portfolios'
});

Vilio.PortfolioView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/portfolio'
});

Vilio.PortfolioShowView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/show'
});

Vilio.PortfolioEditView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/edit'
});