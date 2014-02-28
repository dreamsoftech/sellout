
class HomeController < ApplicationController

	def index
		params[:location] = "Boston, MA" if params[:location].nil?
		@events = Bandsintown::Event.search({
		  :location => params[:location], 
		  :start_date => Time.now,
		  :end_date => 1.week.from_now
		})
	end
end