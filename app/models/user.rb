require 'bcrypt'

class User < ApplicationRecord
    validates :username, presence:true, uniqueness:true
    validates :session_token, presence:true, uniqueness: {scope: :username}
    validates :password, length: {minimum: 6, allow_nil:true}
    validates :image_ref, presence:true, on: :update
    after_initialize :ensure_session_token
 
    attr_reader :password

    has_many :owned_servers,
        class_name: :Server,
        foreign_key: :owner_id

    has_many :owned_channels,
        class_name: :Channel,
        foreign_key: :owner_id

    has_many :messages,
        class_name: :Message,
        foreign_key: :author_id

    has_many :server_memberships,
        class_name: :ServerMembership,
        foreign_key: :member_id

    has_many :servers,
        through: :server_memberships,
        source: :server

    has_many :fellow_server_members,
        through: :servers,
        source: :members
 
    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        if user && user.is_password?(password)
            user
        else
            nil
        end
    end
 
    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end
 
    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end
 
    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save!
        self.session_token
    end
 
    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

end
