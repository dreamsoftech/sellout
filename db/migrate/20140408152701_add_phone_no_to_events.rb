class AddPhoneNoToEvents < ActiveRecord::Migration
  def change
    add_column :events, :phone_number, :string
    add_column :events, :website, :string
  end
end