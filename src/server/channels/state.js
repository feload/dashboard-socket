/**
 * state.js
 * Manage applications state.
 */

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/dashboard-socket';
const collection_name = "state";
const new_client = { app_id: "?", version: "?", users: 0 };

let db = null;
let clients = {};

/**
 * findClients.
 * Find clients records.
 *
 * @param {obj} db
 * @param {function} cb
 */
const findClients = (db, cb) => {
    if(!db) return cb();
    db.collection('state').find({ _id: 'clients' }).toArray((err, docs) => {
        clients = (docs.length) ? docs[0] : {};
        cb();
    });
}

/**
 * saveClient.
 * Save client into db.
 *
 * @param {*} db
 * @param {*} clients
 * @param {*} cb
 */
const saveClient = (db, clients, cb) => {
    if(!db) return cb();
    clients._id = 'clients';
    db.collection(collection_name).save(clients, cb);
}
/**
 * clientsToArray.
 * Converts clients object into array.
 *
 * @param {object} clients
 */
const clientsToArray = (clients) => {
    if(clients["_id"]) delete clients["_id"];
    return Object.keys(clients).map((i) => { return clients[i]; });
};

mongo.connect(url, (err, conn) => {
    if(err) return new Error(err);
    db = conn;
});

/**
 * Main functionality.
 */
module.exports = (io) => {
    //
    // -- Store all online clients data.
    //
    const channel = io

    .of('/state')
    .on('connection', (socket) => {

        // -- Master is asking for information to online. clients.
        socket.on('request_info', () => {
            // Clients are listening to 'request_info' event.
            findClients(db, () => {
                channel.emit('request_info', clientsToArray(clients));
            });
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
            saveClient(db, clients, () => {
                channel.emit('client_connected', clients[app_id]);
            });
        });

        // -- A client went offline.
        socket.on('disconnect', () => {
            const { app_id } = socket;
            if (typeof clients[app_id] !== "undefined"){
                clients[app_id].users -= 1;
                saveClient(db, clients, () => {
                    channel.emit('client_disconnected', clients[app_id]);
                });
            }
        });

    });

    return channel;
};