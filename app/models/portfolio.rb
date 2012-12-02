# == Schema Information
#
# Table name: portfolios
#
#  id          :integer         not null, primary key
#  name        :string(255)
#  description :string(255)
#  created_at  :datetime        not null
#  updated_at  :datetime        not null
#

class Portfolio < ActiveRecord::Base
  authenticates_with_sorcery!
  
  attr_accessible :name, :description, :created_by_id, :updated_by_id, :deleted_by_id, :deleted_at

  validates :name, :presence => true, :uniqueness => { :case_sensitive => false }
  
  class << self
    def not_deleted
      where(:deleted_at => nil)
    end
  end
  
  def mark_deleted(user_id)
    self.deleted_at = Time.now
    self.deleted_by_id = user_id
  end
  
  def mark_deleted!(user_id)
    mark_deleted(user_id)
    self.save
  end
end
