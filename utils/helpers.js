// import moment to peform date formatting
const moment = require('moment'); // require
 
// function to format a date
const formatDate = function (datePassed) {
  return moment.unix(datePassed).format("Do, MMM, YYYY");
}

// function to validate email using regex
const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

module.exports = {
  formatDate,
  validateEmail
};