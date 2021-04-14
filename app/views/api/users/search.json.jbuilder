# @users.each do |user|
#     json.set! user.id do 
#         json.extract! user, :id, :username
#     end
# end

json.users do
    json.array!(@users) do |user|
        json.id user.id
        json.username user.username
    end
end