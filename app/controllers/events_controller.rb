class EventsController < ApplicationController
  before_filter :authenticate_user!, except: [:show]
  layout "admin"

  def index
    @events = current_user.events
  end

	def show
		@artist = Bandsintown::Event.get({
		  :name => params[:id]
		})

    render layout: "application"

	end

	def new
	end

  def create
    event = Event.new(params[:event])
    event.user = current_user

    if event.save
      redirect_to events_path, notice: "Event is created successfully"
    else
      redirect_to events_path, alert: "Failed to create an event"
    end
  end

  def destroy
    event = Event.find(params[:id])
    if event.destroy
      redirect_to events_path, notice: "Event is deleted successfully"
    else
      redirect_to events_path, notice: "Failed to delete an event"
    end
  end
end