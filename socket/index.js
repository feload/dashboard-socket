var io = require('socket.io')(8181);
var messages = require('./channels/messages')(io);
var services = require('./channels/services')(io);
var state = require('./channels/state')(io);