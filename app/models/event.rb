class Event < ActiveRecord::Base
  attr_accessible :title, :description, :artists, 
    :venue_name, :address, :city, :state, :country, :longitude, :latitude,
    :ticket_url, :ticket_price, :perform_date, :on_sale_datetime

  belongs_to :user
end