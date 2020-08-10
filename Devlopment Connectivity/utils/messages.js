<<<<<<< HEAD
const moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;
=======
const moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;
>>>>>>> bd0aecbdd706fea54dfaf256089fe9050ec5ec88
