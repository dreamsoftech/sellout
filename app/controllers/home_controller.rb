class HomeController < ApplicationController

	def index
		params[:location] = request.location.try(:address)
	end

end