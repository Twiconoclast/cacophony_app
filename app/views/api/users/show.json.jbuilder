
    json.id @user.id
    json.username @user.username
    json.image_ref @user.image_ref
    private_server_friends = []
    owned_servers = @user.servers.select {|server| server.owner_id == @user.id}
    public_servers = @user.servers.select {|server| server.private == false}
    private_servers = @user.servers.select {|server| server.private == true}
    private_servers.each {|server| private_server_friends.push(server.recipient_id) unless server.recipient_id == @user.id}
    private_servers.each {|server| private_server_friends.push(server.owner_id) unless server.owner_id == @user.id}
    public_servers.map! {|server| server.id}
    private_servers.map! {|server| server.id}
    owned_servers.map! {|server| server.id}
    json.public_servers public_servers.uniq
    json.private_servers private_servers.uniq
    json.owned_servers owned_servers.uniq
    friends = @user.fellow_server_members.map {|member| member.id}.uniq.select {|id| id != @user.id}
    json.fellow_server_members friends
    json.private_server_friends private_server_friends.uniq
