/**
 * state.js
 * Manage applications state.
 */
const new_client = { app_id: "?", version: "?", users: 0 };

const clientsToArray = (clients) => {
    return Object.keys(clients).map((i) => { return clients[i]; })
};

module.exports = (io) => {

    //
    // -- Store all online clients data.
    //
    var clients = {};

    var channel = io
    .of('/state')
    .on('connection', (socket) => {

        // -- Master is asking for information to online. clients.
        socket.on('request_info', () => {
            // Clients are listening to 'request_info' event.
            channel.emit('request_info', clientsToArray(clients));
        });

        // -- A client got online.
        socket.on('client_connected', (client) => {
            const { app_id, version } = client;
            socket.app_id = app_id;

            if (typeof clients[app_id] == "undefined"){
                delete client.username;
                clients[app_id] = Object.assign({}, new_client, client);
            }

            clients[app_id].users += 1;
            channel.emit('client_connected', clients[app_id]);
        });

        // -- A client went offline.
        socket.on('disconnect', () => {
            const { app_id } = socket;
            if (typeof clients[app_id] !== "undefined"){
                clients[app_id].users -= 1;
                channel.emit('client_disconnected', clients[app_id]);
            }
        });

    });

    return channel;
};