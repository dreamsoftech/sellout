class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.references :user
      t.string :name, null: false
      t.string :mbid, null: false
      t.string :space_url
      t.string :website
      t.string :facebook
      t.string :twitter
      t.attachment :avatar

      t.timestamps
    end
  end
end