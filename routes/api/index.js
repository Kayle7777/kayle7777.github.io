const router = require('express').Router();
const gitHubRoutes = require('./gitHubAPI');

// /api/
router.use('/gitHub', gitHubRoutes);

module.exports = router;
