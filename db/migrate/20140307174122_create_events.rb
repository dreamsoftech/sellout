class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :user
      t.string :title,          null: false
      t.string :description,    limit: 5000
      t.string :artists,        null: false
      t.string :ticket_url,     null: false
      t.string :ticket_price,   null: false
      t.datetime :perform_date, null: false
      t.datetime :on_sale_datetime
      t.string :venue_name,     null: false
      t.string :address,        null: false
      t.string :city,           null: false
      t.string :state,          null: false
      t.string :country,        null: false
      t.decimal :latitude,      default: 0
      t.decimal :longitude,     default: 0

      t.timestamps
    end
  end
end