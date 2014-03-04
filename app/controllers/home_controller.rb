class HomeController < ApplicationController

	def index
		if Rails.env.development?
			params[:location] = "New york" if params[:location].nil?
		else
			params[:location] = request.location.try(:address) || "Charlestown" if params[:location].nil?
		end

		@events = Bandsintown::Event.search({
		  :location => params[:location], 
		  :start_date => Time.now,
		  :end_date => 1.week.from_now
		})
	end
end