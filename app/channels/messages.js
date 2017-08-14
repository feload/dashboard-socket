module.exports = (io) => {
    var channel = io
    .of('/messages')
    .on('connection', (socket) => {
        console.log(`MESSAGES: ${socket.id} online.`);
    });
    return channel;
};