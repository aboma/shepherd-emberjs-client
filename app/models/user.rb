# == Schema Information
#
# Table name: users
#
#  id                           :integer         not null, primary key
#  email                        :string(255)
#  crypted_password             :string(255)
#  salt                         :string(255)
#  last_name                    :string(255)
#  first_name                   :string(255)
#  created_at                   :datetime        not null
#  updated_at                   :datetime        not null
#  remember_me_token            :string(255)
#  remember_me_token_expires_at :datetime
#

class User < ActiveRecord::Base
  authenticates_with_sorcery!
   
  attr_accessible :email, :last_name, :first_name, :password, :password_confirmation

  before_save { |user| user.email = email.downcase }
 
  validates :password, :presence => true, :confirmation => true, :length => { :minimum => 8 }, :on => :create
  validates :last_name, :presence => true
  validates :first_name, :presence => true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, :presence => true, :format => { :with => VALID_EMAIL_REGEX }, :uniqueness => { :case_sensitive => false }
  
end