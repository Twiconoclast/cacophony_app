class Channel < ApplicationRecord
    validates :channel_name, :owner_id, :server_id, presence:true
    validates :channel_name, uniqueness: {scope: :server_id}

    belongs_to :server,
        class_name: :Server,
        foreign_key: :server_id

    belongs_to :owner,
        class_name: :User,
        foreign_key: :owner_id

    has_many :messages,
        class_name: :Message,
        foreign_key: :channel_id

end
