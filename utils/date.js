
const moment = require('moment'); // require
 

const formatDate = function (datePassed) {
  return moment.unix(datePassed).format("Do, MMM, YYYY");
}

module.exports = formatDate;