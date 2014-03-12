class HomeController < ApplicationController

	def index
		begin
			if Rails.env.development?
				params[:location] = "Boston, MA" if params[:location].nil?
			else
				params[:location] = request.location.try(:address) || "Charlestown, SC" if params[:location].nil?
			end

			if params[:start_date].nil? || params[:end_date].nil?
				@events = Bandsintown::Event.search({
				  :location => params[:location], 
				  :start_date => Time.now,
				  :end_date => 1.week.from_now
				})
			else
				start_date = Date.strptime(params[:start_date], '%m/%d/%Y')
				end_date = Date.strptime(params[:end_date], '%m/%d/%Y')
				@events = Bandsintown::Event.search({
				  :location => params[:location], 
				  :start_date => start_date,
				  :end_date => end_date
				})
			end
		rescue Exception => e
			redirect_to :back, alert: e.message
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

			if params[:start_date].nil? || params[:end_date].nil?
				@events = Bandsintown::Event.search({
				  :location => params[:location], 
				  :start_date => Time.now,
				  :end_date => 1.week.from_now
				})
			else
				start_date = Date.strptime(params[:start_date], '%m/%d/%Y')
				end_date = Date.strptime(params[:end_date], '%m/%d/%Y')
				@events = Bandsintown::Event.search({
				  :location => params[:location], 
				  :start_date => start_date,
				  :end_date => end_date
				})
			end
		rescue Exception => e
			redirect_to :back, alert: e.message
		end
	end
end