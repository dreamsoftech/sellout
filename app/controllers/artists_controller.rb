class ArtistsController < ApplicationController
  before_filter :authenticate_user!

  layout "admin"

  def index
    @artists = current_user.artists
  end

  def new
  end

  def create
    artist = Artist.new(params[:artist])
    artist.user = current_user

    if artist.save
      redirect_to artists_path, notice: "Artist is created successfully"
    else
      redirect_to artists_path, alert: "Failed to create an artist"
    end
  end

  def update
    
  end

  def destroy
    artist = Artist.find(params[:id])
    if artist.destroy
      redirect_to artists_path, notice: "Artist is deleted successfully"
    else
      redirect_to artists_path, notice: "Failed to delete an artist"
    end
  end

end