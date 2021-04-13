class RemoveNullAndIndex < ActiveRecord::Migration[5.2]
  def change
    change_column_null :servers, :default_channel_id, false
    remove_index :servers, :default_channel_id
  end
end
