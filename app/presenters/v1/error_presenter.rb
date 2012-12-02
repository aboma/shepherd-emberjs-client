class V1::ErrorPresenter
  
  attr_reader :errors
  
  def initialize(err)
    @errors = err
  end
  
  def as_json(include_root = false, options = {})
    error_hash = nil
    @errors.each do |attr,msg| 
      error_hash += {
        attr => msg
      }.merge(options)
    end
    error_hash = { :errors => error_hash } if include_root
    error_hash
  end
end