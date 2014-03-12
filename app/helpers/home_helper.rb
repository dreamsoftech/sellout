module HomeHelper

	def home_tab_class(tab)
		return "active" if tab == controller.action_name
	end
end
