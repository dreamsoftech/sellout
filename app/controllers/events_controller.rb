class EventsController < ApplicationController

	def show
		@artist = Bandsintown::Artist.get({
		  :mbid => params[:id]
		})
	end
end