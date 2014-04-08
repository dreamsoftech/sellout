class HomeController < ApplicationController

	def index
		params[:location] = "Charleston, SC, United States"#request.location.try(:address)
    venues = Array.new
    a2z = ('a'..'z').to_a
    # a2z.each_with_index do |key, i|
      venues = Bandsintown::Venue.search({
        :query => ('a'..'z').to_a,
        :location => "Charleston, SC, United States"
      })
    # end

    puts venues.flatten.map(&:name).uniq
    puts "----------------------"


	end

end