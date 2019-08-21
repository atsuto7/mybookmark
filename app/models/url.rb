class Url < ApplicationRecord
  belongs_to :user
  has_many :tags, through: :url_tags
  validates :title, presence: true
  validates :url, presence: true
  has_many :url_tags, dependent: :destroy
end
