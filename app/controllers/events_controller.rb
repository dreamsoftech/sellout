class EventsController < ApplicationController

	def show
		@artist = Bandsintown::Artist.get({
		  :name => params[:id]
		})
	end

	def new
	end
end