class AddUniqueContstraintServerMembership < ActiveRecord::Migration[5.2]
  def change
    add_index :server_memberships, [:server_id, :member_id], unique:true
  end
end
