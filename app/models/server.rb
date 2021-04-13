class Server < ApplicationRecord
    validates :server_name, :owner_id, presence:true
    validates :private, inclusion: { in: [ true, false ] } 
    validates :server_name, uniqueness: {scope: :owner_id}
    validates :default_channel_id, presence:true, on: :update

    belongs_to :user,
        class_name: :User,
        foreign_key: :owner_id

    has_many :server_memberships,
        class_name: :ServerMembership,
        foreign_key: :server_id,
        dependent: :delete_all

    has_many :members,
        through: :server_memberships,
        source: :member

    has_many :channels,
        class_name: :Channel,
        foreign_key: :server_id,
        dependent: :delete_all
        
end
