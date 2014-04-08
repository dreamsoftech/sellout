class Poster < ActiveRecord::Base
  attr_accessible :image, :description, :time, :video_url, :website

  has_attached_file :image, 
    styles: { :small => "100x100>" },
    path: "upload/:class/:attachment/:style/:filename",
    default_url: "/assets/missing.jpg",
    storage: :s3,
    url:':s3_domain_url',
    bucket: ENV['AWS_BUCKET'],
    s3_credentials: {
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    }
  
  validates_attachment :image, :presence => true,
    content_type: {content_type: ["image/jpg", "image/jpeg", "image/png"] }


end
