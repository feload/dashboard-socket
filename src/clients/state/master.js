export default {
    init (state, cb) {
        state.on('connect', () => {
            state.emit('request_info');
        });

        state.on('request_info', (clients) => {
            cb(clients);
        });

        state.on('client_connected', (client) => {
            cb([client]);
        });

        state.on('client_disconnected', (client) => {
            cb([client]);
        });
    }
}