// Config
const config = require('../config/config');

// Github Api V3
var github = require('octonode');
const client = github.client(config.token)
const repo = client.repo(config.repo)

// Returns the user related to the token
async function getUsers() {
  
  let users = await repo.contributorsAsync();
  
  return users[0]
}

module.exports = getUsers ;