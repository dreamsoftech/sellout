class CreatePosters < ActiveRecord::Migration
  def change
    create_table :posters do |t|
      t.attachment :image
      t.string    :time
      t.boolean   :active
      t.string    :video_url, limit: 400
      t.string    :website, limit: 400
      t.string    :description, limit: 5000

      t.timestamps
    end
  end
end