// import moment to peform date formatting
const moment = require('moment');
 
// function to format a date
const formatDate = function (datePassed) {
  return moment(datePassed).format("Do MMM, YYYY");
}

module.exports = {
  formatDate
};