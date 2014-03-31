class HomeController < ApplicationController

	def index
		params[:location] = "Charleston, SC, United States"#request.location.try(:address)
	end

end