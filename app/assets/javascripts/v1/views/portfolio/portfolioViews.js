Luxin.PortfolioSelect2 = Luxin.Select2.extend({
	// bind change in selected portfolio to trigger routing 
	// to show portfolio or portfolio list if null
    valueDidChange: Ember.observer(function() {
        this._super();
        var selection = this.get('selection');
        console.log('select2 value changed to ' + selection);
        if (selection) {
        	Luxin.router.transitionTo('root.portfolios.show_portfolio', selection);
        } else {
        	Luxin.router.transitionTo('root.portfolios.index');
        }
    }, 'value')
});

Luxin.PortfoliosView = Ember.View.extend({
  	templateName: 'v1/templates/portfolio/list',
});

Luxin.PortfolioView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/show'
});

Luxin.EditPortfolioView = Ember.View.extend({
	templateName: 'v1/templates/portfolio/edit'
});