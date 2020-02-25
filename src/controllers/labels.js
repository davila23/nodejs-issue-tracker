// Config
const config = require('../config/config');

// Github Api V3
var github = require('octonode');
const client = github.client(config.token)
const repo = client.repo(config.repo)

// Models
const Score = require('../models/score');

var errors = new Set();

/* ------ Corner Cases ------  */

function labelNull(countLabels, issueTitle) {
 
  if (countLabels == 0) {

    if (issueTitle) errors.add({ text: 'Error : ' + issueTitle + ' has no labels assigned ' });

    return new Score(0, true);

  } else {

    return null;
  }
}


function labelMoreThanOne(countLabels, issueTitle) {
  if (countLabels > 1) {

    if (issueTitle) errors.add({ text: 'Error : ' + issueTitle + ' has more than one label assigned ' });

    return score = new Score(0, true);

  } else {

    return null;
  }
}

async function labelWrong(labels, issueTitle) {

  let labelsApi = await repo.labelsAsync()
  var labelsName = new Array(labelsApi[0].map(a => a.name));

  for (const label of labels) {

    if (!labelsName.includes(label.name)) {

      errors.add({ text: 'Error : ' + issueTitle + ' has an invalid label ' });

      return new Score(0, true);

    } else {

      return null;
    }
  };
}

/* ------ Lavel Weight ------  */

function getLabelValue(label) {

  switch (label) {
    case 'Critical Priority':
      return 1000;
    case 'Very High Priority':
      return 500;
    case 'High Priority':
      return 50;
    case 'Mid Priority':
      return 15;
    case 'Low Priority':
      return 7;
    default:
      return 0;
  }
}

module.exports = { labelNull, labelMoreThanOne, labelWrong, getLabelValue, errors };