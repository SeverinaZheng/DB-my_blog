class AddUidToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :uid, :integer
  end
end
