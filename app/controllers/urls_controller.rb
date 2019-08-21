class UrlsController < ApplicationController
  before_action :move_to_index, except: :index
  def index
    if params[:tag_id].present?
     tag = Tag.find(params[:tag_id])
     urls = tag.urls
     @urls = urls.order("created_at DESC")
    else
     @urls = current_user.urls.order("created_at DESC")
    end
  end
  def new
    @url = Url.new
  end
  def create
    require 'selenium-webdriver'
    options = Selenium::WebDriver::Chrome::Options.new
    options.add_argument('--headless')
      driver = Selenium::WebDriver.for :chrome, options: options
      driver.navigate.to "#{url_params[:url]}" 
      page_title = driver.title
      page_title = page_title.truncate(70)
      domain = URI.parse("#{url_params[:url]}").host
      driver.save_screenshot("public/screenshots/#{domain}.png")
    driver.quit
    @url = Url.new(url_params)
    @url.title = page_title
    @url.image = domain
    @url.save
    redirect_to root_path
  end
  def destroy
    if Url.find(params[:id]).user_id == current_user.id
      url = Url.find(params[:id])
      url.destroy
    end
  end

  def search
    @urls = Url.find(3)
  end

  def searchResult
    @keyword = params[:keyword]
    @searchContents = Url.where('memo LIKE(?)', "%#{@keyword}%").where(user_id: current_user.id)
  end
  private

  def url_params
    params.require(:url).permit(:url, :memo,  { :tag_ids => [] }).merge(user_id: current_user.id)
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end
end
