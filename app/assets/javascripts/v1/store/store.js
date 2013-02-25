Luxin.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter.create({ 
	  bulkCommit: false,
	  url: "http://localhost:4444"
  })
});