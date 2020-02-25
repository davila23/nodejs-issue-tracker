// Router
const express = require('express');
const router = express.Router();

// Controllers
var { getIssues, errors } = require('../controllers/issues')
var getUsers = require('../controllers/users')


router.get('/issues', async (req, res) => {

  errors.clear();

  let issues = await getIssues();
  let users = await getUsers();

  res.render('issues/all-issues', { issues, users, errors });

});
 

router.get('/issues/:user', async (req, res) => {

  let issues_ = await getIssues();
  let users = await getUsers();

  // Fix : need an extra validation to filter errors by user
  errors.clear();

  let issues = issues_.filter(i => i.opener === req.params.user);
  res.render('issues/all-issues', { issues, users, errors });

}); 


module.exports = router;
