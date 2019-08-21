class UrlTag < ApplicationRecord
  belongs_to :url
  belongs_to :tag
end
