class RemoveIndexRecipientId < ActiveRecord::Migration[5.2]
  def change
    remove_index :servers, :recipient_id
  end
end
