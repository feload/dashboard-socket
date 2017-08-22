state.on('connect', () => {
    state.emit('client_connected', { app_id, version, username });
});
state.on('request_info', () => {
    state.emit('client_response', { app_id, version, username })
});