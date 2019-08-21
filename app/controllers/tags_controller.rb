class TagsController < ApplicationController
  protect_from_forgery :except => [:create] 
  def search
    @tags = Tag.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: params[:tag_id]).where(user_id: current_user.id)
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  def create
    @tag = Tag.create(name: params[:name], user_id: current_user.id)
    respond_to do |format|
      format.json
    end
  end

  private
  def tag_params
    params.require(:tag).permit(:name).merge(user_id: current_user.id)
  end
end
