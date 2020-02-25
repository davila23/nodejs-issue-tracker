const helpers = {};

helpers.getNumWorkDays = (date) => {

  return getNumWorkDays(date);

};

function getNumWorkDays(date) {
 
  var numWorkDays = 0;
  var createdDate = new Date(date);
  var currentDate = new Date();

  while (createdDate <= currentDate) {

    // Skips Sunday and Saturday
    if (createdDate.getDay() !== 0 && createdDate.getDay() !== 6) {
      numWorkDays++;
    }

    createdDate = createdDate.addDays(1);
  }

  return (numWorkDays === 0) ? 1 : numWorkDays;
}


Date.prototype.addDays = function (days) {

  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);

  return date;
};

module.exports = helpers;
