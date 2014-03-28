class Artist < ActiveRecord::Base
  attr_accessible :name, :mbid, :space_url, :website, :facebook, :twitter, :avatar

  belongs_to :user

  has_attached_file :avatar, :styles => { :large => "600x600>", :medium => "300x300>", mini: "120x120>"},
    path: "upload/:class/:attachment/:style/:filename",
    default_url: "/assets/missing.jpg",
    storage: :s3,
    url:':s3_domain_url',
    bucket: ENV['AWS_BUCKET'],
    s3_credentials: {
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    }
  validates_attachment :avatar, :presence => true,
    content_type: {content_type: ["image/jpg", "image/jpeg", "image/png"] }

end