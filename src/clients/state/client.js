export default {
    init (state, app) {
        state.on('connect', () => {
            state.emit('client_connected', app);
        });
        state.on('request_info', () => {
            state.emit('client_response', app)
        });
    }
};