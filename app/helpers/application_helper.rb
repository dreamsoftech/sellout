require 'open-uri'

module ApplicationHelper

  def display_base_errors resource
    return '' if (resource.errors.empty?) or (resource.errors[:base].empty?)
    messages = resource.errors[:base].map { |msg| content_tag(:p, msg) }.join
    html = <<-HTML
    <div class="alert alert-error alert-block">
      <button type="button" class="close" data-dismiss="alert">&#215;</button>
      #{messages}
    </div>
    HTML
    html.html_safe
  end

  def artist_image_url(event)
    artist = event.artists.first
    artist.image_url unless artist.nil?
  end

  def render_artists_with_carousel(event)
    artists = event.artists
    content_tag(:li, nil, :class => 'item') do
      artists.collect { |x|
        image_tag x.image_url, class: "full"
      }
    end
  end
end