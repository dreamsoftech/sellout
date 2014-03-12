class HomeController < ApplicationController

	def index
		if Rails.env.development?
			params[:location] = "Boston, MA" if params[:location].nil?
		else
			params[:location] = request.location.try(:address) || "Charlestown, SC" if params[:location].nil?
		end
	end

	def venues
		begin
			if Rails.env.development?
				params[:location] = "Boston, MA" if params[:location].nil?
			else
				params[:location] = request.location.try(:address) || "Charlestown, SC" if params[:location].nil?
			end

			@events = Bandsintown::Event.search({
			  :location => params[:location]})
		
		rescue Exception => e
			redirect_to :back, alert: e.message
		end
	end

	def calendar
		begin
			if Rails.env.development?
				params[:location] = "Boston, MA" if params[:location].nil?
			else
				params[:location] = request.location.try(:address) || "Charlestown, SC, USA" if params[:location].nil?
			end

			@events = Bandsintown::Event.search({
			  :location => params[:location], 
			  :start_date => Time.now,
			  :end_date => Time.now + 1.day
			})

		rescue Exception => e
			redirect_to :back, alert: e.message
		end
	end
end