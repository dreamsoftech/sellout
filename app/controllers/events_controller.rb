class EventsController < ApplicationController
  layout "admin"

	def show
		@artist = Bandsintown::Artist.get({
		  :name => params[:id]
		})

	end

	def new
	end
end