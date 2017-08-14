module.exports = (io) => {
    var users = { };
    var channel = io
    .of('/state')
    .on('connection', (socket) => {
        console.log(`STATE: ${socket.id} online.`);
        socket.on('disconnect', () => {
            users[socket.app_id] = users[socket.app_id].splice(users[socket.app_id].lastIndex(socket.id), 1);
            console.log(`STATE: ${socket.id} offline.`);
        });
        socket.on('ask', (msg) => {
            console.log(`${socket.id} is asking for ${msg}`);
            channel.emit('ask', msg);
        });
        socket.on('user_online', (user) => {
            socket.app_id = user.app_id;
            if(users[socket.app_id] === undefined){
                users[socket.app_id] = [socket.id];
            }else{
                users[socket.app_id].push(socket.id);
            }
            channel.emit('user_online', users);
        });
        socket.on('answer', (msg) => {
            console.log(`${msg.app_id} ohh master...`);
            channel.emit('answer', msg);
        });
    });
    return channel;
};