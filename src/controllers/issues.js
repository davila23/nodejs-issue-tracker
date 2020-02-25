// Config
const config = require('../config/config');

// Github Api V3
var github = require('octonode');
const client = github.client(config.token)
const repo = client.repo(config.repo)

// Models
const Issue = require('../models/issue');

// Helpers
const { getNumWorkDays } = require('../helpers/Utils');

var { getScore, errors } = require('./score')
var issues = new Set();

var getIssues = async function () {
  
  errors.clear();
  issues.clear();

  let issuesApi = await repo.issuesAsync({ per_page: 10, state: 'open', sort: 'created', filter: 'assigned' })

  for (const issue of issuesApi[0]) {

    await generateData(issue)

  };

  let issues_ = [...issues].sort((a, b) => b.score.value - a.score.value);

  return issues_;

}


async function generateData(issue_) {

  let daysOpened = getNumWorkDays(issue_.created_at);

  var score = await getScore(issue_);

  const issue = new Issue(issue_.title, issue_.id, daysOpened, issue_.assignee.login, issue_.labels, score, issue_.html_url);

  // Add each Issue to the Array
  issues.add(issue)

}

module.exports = { getIssues, errors };