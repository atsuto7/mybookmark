class Tag < ApplicationRecord
  has_many :url_tags, dependent: :destroy
  has_many :urls, through: :url_tags
  validates :name, presence: true
  validates :name,  uniqueness: { scope: [:user_id]  }
end
