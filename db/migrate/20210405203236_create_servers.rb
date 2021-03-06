class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.string :server_name, null:false
      t.integer :owner_id, null:false
      t.boolean :private, null:false

      t.timestamps
    end
    add_index :servers, :owner_id
    add_index :servers, [:server_name, :owner_id], unique:true
  end
end
