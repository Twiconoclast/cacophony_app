class AddDefaultChannelAndRecipientIdToServers < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :default_channel_id, :integer
    add_index :servers, :default_channel_id
    add_column :servers, :recipient_id, :integer
    add_index :servers, :recipient_id, unique: [scope: :owner_id]
  end
end
