const router = require('express').Router();
const apiController = require('../../controllers/gitHubGet');

// /api/gitHub/

router.route('/graphql').post(apiController.graphQLgitData);

module.exports = router;
