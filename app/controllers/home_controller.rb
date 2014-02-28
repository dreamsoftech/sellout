
class HomeController < ApplicationController

	def index
		@events = Bandsintown::Event.search({
		  :location => 'Boston, MA', 
		  :start_date => Time.now,
		  :end_date => 1.week.from_now
		})
	end
end