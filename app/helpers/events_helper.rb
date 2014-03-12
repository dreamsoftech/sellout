module EventsHelper

	def get_time(datetime)
		return datetime.strftime("%I:%M %p")
	end
end
