const moment = require('moment');

exports.formatDate = function (date, format) {
    return moment(date).format(format)
}