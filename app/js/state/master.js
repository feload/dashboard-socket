state.on('connect', () => {
    state.emit('request_info');
});

state.on('request_info', (clients) => {
    renderDOM(clients);
});

state.on('client_connected', (client) => {
    renderDOM([client]);
});

state.on('client_disconnected', (client) => {
    renderDOM([client]);
});