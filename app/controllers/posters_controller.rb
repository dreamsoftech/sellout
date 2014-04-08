class PostersController < ApplicationController
  before_filter :authenticate_user!
  layout "admin"

  def index
    @posters = Poster.all
  end

  def create
    poster = Poster.new(params[:poster])

    if poster.save
      redirect_to posters_path, notice: "Poster is created successfully"
    else
      redirect_to posters_path, alert: "Failed to create the poster"
    end
  end

  def update
    poster = Poster.find(params[:id])
    if post.update_attributes(params[:poster])
      redirect_to posters_path, notice: "Poster is updated successfully"
    else
      redirect_to posters_path, alert: "Failed to update the poster"
    end
  end

  def destroy
    poster = Poster.find(params[:id])
    if poster.destroy
      redirect_to posters_path, notice: "Poster is deleted successfully"
    else
      redirect_to posters_path, notice: "Failed to delete the poster"
    end
  end

end
