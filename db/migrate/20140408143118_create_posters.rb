class CreatePosters < ActiveRecord::Migration
  def change
    create_table :posters do |t|
      t.string    :artist
      t.string    :video_url, limit: 400
      t.string    :website, limit: 400
      t.string    :description, limit: 5000

      t.timestamps
    end
  end
end