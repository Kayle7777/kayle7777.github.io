const router = require('express').Router();
const apiController = require('../../controllers/gitHubGet');

// /api/gitHub/
router.route('/').get(apiController.getAllRepoData);

module.exports = router;
