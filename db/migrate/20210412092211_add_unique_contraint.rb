class AddUniqueContraint < ActiveRecord::Migration[5.2]
  def change
    change_column_null :servers, :default_channel_id, false
  end
end
