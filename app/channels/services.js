module.exports = (io) => {
    var channel = io
    .of('/services')
    .on('connection', (socket) => {
        console.log(`SERVICES: ${socket.id} online.`);
    });
    return channel;
};