json.set! @user.id do
    json.id @user.id
    json.username @user.username
    public_servers = @user.servers.select {|server| server.private == false}
    private_servers = @user.servers.select {|server| server.private == true}
    public_servers.map! {|server| server.id}
    private_servers.map! {|server| server.id}
    json.public_servers public_servers
    json.private_servers private_servers
    friends = @user.fellow_server_members.map {|member| member.id}.uniq.select {|id| id != @user.id}
    json.fellow_server_members friends
end