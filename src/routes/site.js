const express = require('express');
const siteController = require('../app/controllers/SiteController');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/', siteController.index);

module.exports = router;
