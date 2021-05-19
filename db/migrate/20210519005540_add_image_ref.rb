class AddImageRef < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :image_ref, :string
  end
end
