module HomeHelper

	def home_tab_class(tab)
		return "active" if tab == controller.action_name
	end

	def change_view(view, label)
		content_tag(:a, label, 
			class: "btn btn-default btn-lg", 
			"ng-click"=>"view='#{view}'; getEvents();", 
			"ng-class"=>"{active: view=='#{view}'}"
		)
	end
end
