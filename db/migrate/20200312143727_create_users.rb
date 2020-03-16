class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :uid
      t.string :name
      t.integer :year

      t.timestamps null: false
    end
  end
end
