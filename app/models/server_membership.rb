class ServerMembership < ApplicationRecord
    validates :member_id, :server_id, presence:true

    belongs_to :member,
        class_name: :User,
        foreign_key: :member_id
    
    belongs_to :server,
        class_name: :Server,
        foreign_key: :server_id
        
end
