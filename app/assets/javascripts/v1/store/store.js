Luxin.store = DS.Store.create({
  revision: 8,
  adapter: DS.RESTAdapter.create({ 
	  bulkCommit: false,
	  url: "http://localhost:4444"
  })
});