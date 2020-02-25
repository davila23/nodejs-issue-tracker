// Config
const config = require('../config/config');

// Models
const Score = require('../models/score');

// Helpers
const { getNumWorkDays } = require('../helpers/Utils');

// Controllers

var { labelNull, labelMoreThanOne , labelWrong , getLabelValue, errors } = require('./labels')


var getScore = async function (issue) {
  

  let countLabels = issue.labels.length;
  let issueTitle = issue.title


  // VALIDATE ERRORS 

  if (labelNull(countLabels) != null) return labelNull(countLabels, issueTitle)

  if (labelMoreThanOne(countLabels) != null) return labelMoreThanOne(countLabels, issueTitle)
  
  // if (labelWrong(issue.labels) != null) return labelWrong(issue.labels,issueTitle)

  // OK 

  let daysOpened = await getNumWorkDays(issue.created_at);

  var labelValue = await getLabelValue(issue.labels[0].name);

  let scoresValue = labelValue * daysOpened;

  score = new Score(scoresValue, (scoresValue > 500) ? false : true);

  // console.log('Issue Title :'+ issue.title + 'Label Value :' + labelValue , '  Days Opened : ' + daysOpened + '  Score  (Label Value * Days Opened):  ' + scoresValue)

  return score;

}

module.exports = { getScore, errors };