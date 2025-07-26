const express = require('express');
const router = express.Router();
const { chatHandler } = require('../controller/chatController');

router.post('/', chatHandler);

module.exports = router;
