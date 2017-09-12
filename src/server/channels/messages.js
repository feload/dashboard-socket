module.exports = (io) => {
    var channel = io
    .of('/messages')
    .on('connection', (socket) => { });
    return channel;
};