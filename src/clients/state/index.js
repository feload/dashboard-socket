import master from './master';
import client from './client';

window.dboard = window.dboard || {};
window.dboard.state = {
    client,
    master
};

export default window.dboard;