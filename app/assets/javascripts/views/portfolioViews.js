Shepherd.PortfolioSelect2 = Shepherd.Select2.extend({
    classNames: ['select2-portfolio'],

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

Shepherd.PortfoliosIndexView = Ember.View.extend({
  	templateName: 'portfolio/portfolioIndex'
});

Shepherd.PortfoliosNewView = Ember.View.extend({
	templateName: 'portfolio/portfolioEdit'
});

Shepherd.PortfoliosView = Ember.View.extend({
	templateName: 'portfolio/portfolios'
});

Shepherd.PortfolioView = Ember.View.extend({
	templateName: 'portfolio/portfolio'
});

Shepherd.PortfolioShowView = Ember.View.extend({
	templateName: 'portfolio/portfolioShow'
});

Shepherd.PortfolioEditView = Ember.View.extend({
	templateName: 'portfolio/portfolioEdit'
});
