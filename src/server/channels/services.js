module.exports = (io) => {
    var channel = io
    .of('/services')
    .on('connection', (socket) => { });
    return channel;
};