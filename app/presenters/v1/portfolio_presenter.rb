class V1::PortfolioPresenter
  
  attr_reader :portfolio
  
  def initialize ( resource )
    @portfolio = resource
  end
  
  def as_json(include_root = false, options = {})
    port_hash = {
      :id => @portfolio.id,
      :name => @portfolio.name,
      :description => @portfolio.description,
      :url => "/portfolios/#{@portfolio.id}",
      :created_at => @portfolio.created_at,
      :updated_at => @portfolio.updated_at,
      :deleted_at => @portfolio.deleted_at
    }.merge(options)
    port_hash = { :portfolios => port_hash } if include_root
    port_hash
  end
end