class V1::UserPresenter
  
  attr_reader :user
  
  def initialize( resource )
    @user = resource
  end
  
  def as_json(include_root = false)
    user_hash = {
      :id => @user.id,
      :email => @user.email,
      :last_name => @user.last_name,
      :first_name => @user.first_name
    }
    user_hash = { :user => user_hash } if include_root
    user_hash
  end
  
end