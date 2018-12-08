const router = require('express').Router();
const gitHubRoutes = require('./gitHubAPI');

// api routes
// /api/gitHub/
router.use('/gitHub', gitHubRoutes);

module.exports = router;
